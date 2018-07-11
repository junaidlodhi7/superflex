import {   Component,
    Input,
    Output,
    ViewChild,
    EventEmitter,
    AfterViewInit,
    OnDestroy, } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../services/notifications.services";
import {FunctionalMovementsService} from "../../../services/functional_movements/functional-movements.service";
import {SuitsService} from "../../../services/suits/suits.service";
import {Router} from "@angular/router";

import * as CodeMirror from 'codemirror/lib/codemirror.js';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/mode/yaml/yaml.js';

import  *as yaml from 'js-yaml/index.js';
import 'codemirror/addon/lint/lint.js';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss']
})
export class NewFunctionalMovementComponent implements AfterViewInit, OnDestroy {

    form: FormGroup;
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
    suitTypes= [];

    constructor(private suitsService: SuitsService, private fb: FormBuilder,
                private notify: NotificationService,
                private functionalMovementsService: FunctionalMovementsService,
                private router: Router) {
        this.getSuits();
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

    getSuits(){
        this.suitsService.list().subscribe(res => {
            let response = res.json();
            if(response.success) {
                this.suitTypes = response.data;
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
    get value() {
        return this._value;
    }

    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: [null, Validators.compose([Validators.required])],
            suit_id: [],
            description: []
        });
        this.alert = {
            id: 4,
            type: 'danger',
            message: '',
            closed: true
        };


    }

    ngOnDestroy(){}
    onSubmit(event){

        try {
            let doc = yaml.safeLoad(this.instance.getValue());
            let obj = {
                name: this.form.value.name,
                description: this.form.value.description,
                suit_id: this.form.value.suit_id,
                trajectory: this.instance.getValue()
            };
            this.functionalMovementsService.create(obj).subscribe( result => {
                let response = result.json();
                if(response.success){
                    this.form.reset();
                    this.router.navigate(["/functionalmovements"]);
                    this.notify.successNotify(result.json().message);
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

        }catch (e) {
            this.notify.errorNotify(e.reason);
        }
    }


    /**
     * On component view init
     */
    ngAfterViewInit() {

        this.config = this.config || {};
        this.value = this._default_value;
        this.codemirrorInit(this.config);
    }

    /**
     * Initialize codemirror
     */
    codemirrorInit(config) {
        this.instance = CodeMirror.fromTextArea(document.getElementById('code-editor'), config);
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
}
