import {Router, ActivatedRoute, Params} from '@angular/router';
import {FunctionalMovementsService} from "../../services/functional_movements/functional-movements.service";
import {FiniteStateMachineService} from "../../services/finite_state_machine/finite-state-machine.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { NotificationService} from "../../services/notifications.services";

import {
    Component,
    Input,
    Output,
    ViewChild,
    EventEmitter,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';

import * as CodeMirror from 'codemirror/lib/codemirror.js';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/mode/yaml/yaml.js';

import  *as yaml from 'js-yaml/index.js';
import 'codemirror/addon/lint/lint.js';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-yaml-editor',
    templateUrl: './yaml-editor.component.html',
    styleUrls: ['./yaml-editor.component.scss']
})
export class YamlEditorComponent  implements AfterViewInit, OnDestroy{

    @Input() config;
    @Output() change = new EventEmitter();
    @Output() focus = new EventEmitter();
    @Output() blur = new EventEmitter();
    @Output() cursorActivity = new EventEmitter();

    @ViewChild('host') host;

    @Output() instance = null;

    _value = '';
    _default_value = '';
    functionalMovementId;
    revisions = [];
    widgets: any;
    alert = {};
    modaal: any;
    found = [];
    GUTTER_ID = "CodeMirror-lint-markers";
    private _serviceObject;
    private _params;

    form: FormGroup;


    /**
     * Constructor
     */
    constructor(private notify: NotificationService ,
                private  router: Router ,
                private finiteStateMachineService: FiniteStateMachineService ,
                private functionalMovementsService: FunctionalMovementsService,
                private activatedRoute: ActivatedRoute,
                private fb: FormBuilder) {

        this.form = this.fb.group({
            description: []
        });

        this.alert = {
            id: 4,
            type: 'danger',
            message: '',
            closed: true
        };
        this.activatedRoute.params.subscribe((params: Params) => {
            this._params = params;
            if (this.isFunctionalMovement())
            {
                this._serviceObject = functionalMovementsService;
                this.functionalMovementId = params['functionalMovementId'];
            }else{
                this._serviceObject = finiteStateMachineService;
                this.functionalMovementId = params['finiteStateMachineId'];
            }
        });
        this.widgets = [];
        this.config ={
            autofocus: true,
            lineNumbers: true,
            mode: 'yaml',
            gutters: ['CodeMirror-lint-markers' , "CodeMirror-linenumbers", "breakpoints"],
            lint: true,
            showHint: true,
            lineWrapping: true,
            showSearchButton: true,

        };
        this._default_value = '';

        if(this.isNew()){
            this.writeValue(this._default_value);
        }
        else {
            this._serviceObject.retrieveRevision(this.functionalMovementId , this.getId()).subscribe(res => {
                let response = res.json();
                if(response.success)
                {
                    let value = this.isFunctionalMovement() ? response.data.trajectory : response.data.fsm;
                    this.writeValue(value)
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
    }

    isFunctionalMovement()
    {
        return (typeof  this._params['functionalMovementId'] !== 'undefined' &&  this._params['functionalMovementId'] !== null)
    }
    isFiniteStateMachine()
    {
        return (typeof  this._params['finiteStateMachineId'] !== 'undefined' &&  this._params['finiteStateMachineId'] !== null)
    }
    isNew()
    {

        if (typeof  this._params['id'] !== 'undefined' &&  this._params['id'] !== null)
        {
            return false;
        }else{
            return true;

        }
    }
    getId()
    {
        if(typeof  this._params['id'] !== 'undefined' &&  this._params['id'] !== null)
            return this._params.id;
    }
    get value() { return this._value; }

    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    onSubmit(){
        try {
            let doc = yaml.safeLoad(this.instance.getValue());
            let revision = this.isFunctionalMovement()
                ?{
                    description: this.form.value.description,
                    trajectory: this.instance.getValue()
                }
                :{
                    fsm: this.instance.getValue()
                };
            console.log(revision);
            this._serviceObject.createRevision(this.functionalMovementId , revision).subscribe(res => {
                let response  = res.json();
                if(response.success)
                {
                    this.notify.successNotify(response.message);
                    if(this.isFunctionalMovement()){
                        this.router.navigate(['/functionalmovements/' + this.functionalMovementId]);
                    }else{
                        this.router.navigate(['/finitestatemachines/' + this.functionalMovementId]);
                    }
                }else if(!response.success) {
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
     * On component destroy
     */
    ngOnDestroy() {

    }


    ngOnInit()
    {


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
