import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../services/notifications.services";
import {ApiCommandSequenceRevisionsService} from "../../services/api_command_sequence_revisions/api-command-sequence-revisions.service";
import {ApiCommandSequencesService} from "../../services/api_command_sequences/api-command-sequences.service";

import * as CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/mode/yaml/yaml.js';
import  *as yaml from 'js-yaml/index.js';
import 'codemirror/addon/lint/lint.js';

@Component({
  selector: 'app-api-command-sequence-revisions',
  templateUrl: './api-command-sequence-revisions.component.html',
  styleUrls: ['./api-command-sequence-revisions.component.scss']
})
export class ApiCommandSequenceRevisionsComponent implements OnInit, AfterViewInit, OnDestroy {

    public form: FormGroup;
    apiCommandSequenceRevisions: any = [];
    apiCommandSequences: any = [];
    noVal = null;
    public editForm: FormGroup;
    toEdit = {};
    editorFlag = false;
    selected = "selected";
    no = null;
    pagination: any = {};

    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 3;
    public numPages:number = 100;
    public length:number = 0;
    modaal:any;
    format = 'YYYY-MM-DD hh:mm:ss a';

    //yaml variables
    alert = {};
    @Input() config;
    @Output() change = new EventEmitter();
    @Output() focus = new EventEmitter();
    @Output() blur = new EventEmitter();
    @Output() cursorActivity = new EventEmitter();
    @ViewChild('host') host;
    @Output() instance = null;
    _value = '';
    _default_value = '';
    widgets: any;
    found = [];
    GUTTER_ID = "CodeMirror-lint-markers";
    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    constructor(private fb: FormBuilder,
                private modalService: NgbModal,
                private notify:NotificationService,
                private apiCommandSequencesService:ApiCommandSequencesService,
                private apiCommandSequenceRevisionsService:ApiCommandSequenceRevisionsService){

        this.widgets = [];
        this.config = {
            autofocus: true,
            lineNumbers: true,
            mode: 'yaml',
            gutters: ['CodeMirror-lint-markers', "CodeMirror-linenumbers", "breakpoints"],
            lint: true,
            showHint: true,
            lineWrapping: true,
            showSearchButton: true,

        };
        this._default_value = '';
    }

    get value() {
        return this._value;
    }

    ngOnInit() {
        this.getApiCommandSequenceRevisions(1);
        this.getApiCommandSequences();
        this.form = this.fb.group ( {
            version: [null , Validators.compose ( [ Validators.required ] )],
            description: [null],
            notes: [null],
            period: [null , Validators.compose ( [ Validators.required ] )],
            author: [null , Validators.compose ( [ Validators.required ] )],
            period_units: [null],
            api_command_sequence_id: [null , Validators.compose ( [ Validators.required ] )]

        });
        this.editForm = this.fb.group ( {
            version: [null],
            description: [null],
            notes: [null],
            period: [null],
            author: [null],
            period_units: [null],
            api_command_sequence_id: [null]
        });
        this.alert = {
            id: 4,
            type: 'danger',
            message: '',
            closed: true
        };

    }

    ngOnDestroy(){}
    ngAfterViewInit() {

        this.config = this.config || {};
        this.value = this._default_value;
    }

    getApiCommandSequenceRevisions(page){
        this.apiCommandSequenceRevisionsService.list(page).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.apiCommandSequenceRevisions = response.data;
                this.pagination = response.pagination;
                this.page = this.pagination.current;
                this.itemsPerPage = this.pagination.per_page;
                this.numPages = this.pagination.pages;
                this.length = this.pagination.total;
            }
        }, err => {
            err = err.json();
            if(err.errors) {
                for(let i=0;i<err.errors.length;i++){
                    this.notify.errorNotify(err.errors[i].message);
                }
            }
            else{
                this.notify.errorNotify("Connectivity issue!");
            }
        });
    }

    codemirrorInit(config) {
        if(this.editorFlag){
            this.instance = CodeMirror.fromTextArea(document.getElementById('code-editor-editor'), config);
        }
        else{
            this.instance = CodeMirror.fromTextArea(document.getElementById('code-editor'), config);

        }
        this.instance.setValue(this._value);
        this.instance.on('change', () => {
            this.updateValue(this.instance.getValue());
            this.checkSyntaxErrors();
        });

        this.instance.on('focus', (instance, event) => {
            this.focus.emit({instance, event});
            this.checkSyntaxErrors();
        });

        this.instance.on('cursorActivity', (instance) => {
            this.cursorActivity.emit({instance});
            this.checkSyntaxErrors();
        });

        this.instance.on('blur', (instance, event) => {
            this.blur.emit({instance, event});
            this.checkSyntaxErrors();
        });

    }

    makeMarker1() {
        var marker = document.createElement("div");
        marker.className = 'CodeMirror-gutter-elt';
        var icon = marker.appendChild(document.createElement("div"));
        icon.className = "CodeMirror-lint-marker-error";
        return marker;
    }

    checkSyntaxErrors()
    {
        let editor = this.instance;
        try {
            let doc = yaml.safeLoad(this._value);
            for (var i = 0; i < this.widgets.length; ++i){
                editor.setGutterMarker( this.widgets[i].line, this.GUTTER_ID, null);
                this.alert['closed'] = true;
            }
            this.widgets.length = 0;
        } catch (e) {
            var loc = e.mark;
            var line = loc.line == 1 ? 0 : loc.line;
            for (var i = 0; i < this.widgets.length; ++i)
            {
                editor.setGutterMarker( this.widgets[i].line, this.GUTTER_ID, null);
                this.alert['closed'] = true;
            }
            this.widgets.length = 0;
            this.alert['message'] = e.message;
            this.alert['closed'] = false;

            editor.setGutterMarker( line, this.GUTTER_ID,  this.makeMarker1());

            this.widgets.push({line: line});
            var info = editor.getScrollInfo();
            var after = editor.charCoords({line: editor.getCursor().line + 1, ch: 0}, "local").top;
            if (info.top + info.clientHeight < after)
                editor.scrollTo(null, after - info.clientHeight + 3);
        }
    }
    /**
     * Value update process
     */
    updateValue(value) {
        this.value = value;
        this.onTouched();
        this.change.emit(value);
    }

    /**
     * Implements ControlValueAccessor
     */
    writeValue(value) {
        this._value = value || '';
        if (this.instance) {
            this.instance.setValue(this._value);
        }
    }
    onChange(_) {}
    onTouched() {}
    onMouseOver(e)
    {

    }
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }

    public onChangeTable(page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        this.getApiCommandSequenceRevisions(page.page);
    }

    open(content) {
        this.editorFlag = false;
        this.form.reset();
        this.modaal = this.modalService.open(content,{size:'lg'});
        this.codemirrorInit(this.config);
        this.instance.setValue('');

    }

    getApiCommandSequences(){
        this.apiCommandSequencesService.list(1).subscribe(res => {
            let response = res.json();
            if(response.success)
            {
                this.apiCommandSequences = response.data;
                // this.pagination = response.pagination;
                // this.page = this.pagination.current;
                // this.itemsPerPage = this.pagination.per_page;
                // this.numPages = this.pagination.pages;
                // this.length = this.pagination.total;
            }
        }, err => {
            err = err.json();
            if(err.errors) {
                for(let i=0;i<err.errors.length;i++){
                    this.notify.errorNotify(err.errors[i].message);
                }
            }
            else{
                this.notify.errorNotify("Connectivity issue!");
            }
        });
    }

    onSubmit(){
        let doc = yaml.safeLoad(this.instance.getValue());
        if(this.instance.getValue()==''){
            this.notify.errorNotify('Notes(YAML) can not be empty.');
            return;
        }
        let HV = {
            version: this.form.value.version,
            description: this.form.value.description,
            notes: this.instance.getValue(),
            period: this.form.value.period,
            author: this.form.value.author,
            period_units : this.form.value.period_units,
            api_command_sequence_id : this.form.value.api_command_sequence_id
        };
        this.apiCommandSequenceRevisionsService.createApiCommandSequenceRevision(HV).subscribe( result => {
            let response =  result.json();
            if(response.success){
                this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.getApiCommandSequenceRevisions(1);
            }
            else if(!response.success) {
                for(let i=0;i<response.errors.length;i++){
                    this.notify.errorNotify(response.errors[i].message);
                }
            }
        }, err => {
            err = err.json();
            if(err.errors) {
                for(let i=0;i<err.errors.length;i++){
                    this.notify.errorNotify(err.errors[i].message);
                }
            }
            else{
                this.notify.errorNotify("Connectivity issue!");
            }
        });
    }

    openEditModal(content,id){
        this.editorFlag = true;
        this.editForm.reset();
        for(let i=0; i<this.apiCommandSequenceRevisions.length; i++){
            if(this.apiCommandSequenceRevisions[i].id == id){
                this.toEdit = this.apiCommandSequenceRevisions[i];
            }
        }
        this.modaal = this.modalService.open(content,{size:'lg'});
        this.codemirrorInit(this.config);
        this.instance.setValue(this.toEdit['notes']);
    }

    onSaveChanges(id){
        let doc = yaml.safeLoad(this.instance.getValue());
        if(this.instance.getValue()==''){
            this.notify.errorNotify('Notes(YAML) can not be empty.');
            return;
        }
        let obj = {
            version: this.editForm.value.version  || this.toEdit['version'],
            description: this.editForm.value.description  || this.toEdit['description'],
            notes: this.instance.getValue()  || this.toEdit['notes'],
            period: this.editForm.value.period  || this.toEdit['period'],
            author: this.editForm.value.author  || this.toEdit['author'],
            period_units : this.editForm.value.period_units  || this.toEdit['period_units'],
            api_command_sequence_id : this.editForm.value.api_command_sequence_id  || this.toEdit['api_command_sequence_id']
        };

        this.apiCommandSequenceRevisionsService.updateApiCommandSequenceRevision(id, obj).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.getApiCommandSequenceRevisions(1);
                this.modaal.close();
                this.editForm.reset();
            }
            else if(!response.success) {
                for(let i=0;i<response.errors.length;i++){
                    this.notify.errorNotify(response.errors[i].message);
                }
            }
        }, err => {
            err = err.json();
            if(err.errors) {
                for(let i=0;i<err.errors.length;i++){
                    this.notify.errorNotify(err.errors[i].message);
                }
            }
            else{
                this.notify.errorNotify("Connectivity issue!");
            }
        })
    }

    confirmDelete(id){
        this.apiCommandSequenceRevisionsService.deleteApiCommandSequenceRevision(id).subscribe(res => {
            let response = res.json();
            if (response.success) {
                this.notify.successNotify(response.message);
                this.getApiCommandSequenceRevisions(1);
                this.modaal.close();
            }
            else if(!response.success) {
                for(let i=0;i<response.errors.length;i++){
                    this.notify.errorNotify(response.errors[i].message);
                }
            }
        }, err => {
            err = err.json();
            if(err.errors) {
                for(let i=0;i<err.errors.length;i++){
                    this.notify.errorNotify(err.errors[i].message);
                }
            }
            else{
                this.notify.errorNotify("Connectivity issue!");
            }
        })
    }

}
