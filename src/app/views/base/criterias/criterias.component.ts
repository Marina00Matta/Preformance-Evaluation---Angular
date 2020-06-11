import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CriteriaType } from 'src/app/interfaces/CriteriaType';
import { Criteria } from 'src/app/interfaces/Criteria';
import { CriteriasService } from '../../../services/criterias.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FireAlertService } from 'src/app/services/fire-alert.service';
import {EvaluationCycle} from 'src/app/interfaces/EvaluationCycle';
import { DatePipe } from '@angular/common';
import { ActivatedRoute , Router} from '@angular/router';


@Component({
  selector: 'app-criterias',
  templateUrl: './criterias.component.html'
})
export class CriteriasComponent implements OnInit {
  criterias;
  trashCriterias;
  types; 
  editableCriteriaObj : Criteria;
  editCriteria : FormGroup;
  constructor(private _criteriasService: CriteriasService,private modalService: BsModalService,
    private alert:FireAlertService, private route:ActivatedRoute ,
    private router:Router ,) { }

  ngOnInit(): void {
    this.getCriteriaList();
    this.getCriteriaTypeList();
    this.getTrashedCriteriaList();

  }

 

  getCriteriaTypeList(){
    this._criteriasService.getCriteriaTypes().subscribe(dataType =>{
      console.log(dataType)
      this.types = dataType;
    })
  }

  deleteFunction(id){
    this._criteriasService.deleteCriteria(id).subscribe(()=>{console.log('deleted');
    location.reload();
    });
          console.log(id);
    this.getCriteriaList();
    
  }
  getCriteriaList(){
    this._criteriasService.getCriteria().subscribe(data =>{
      console.log(data)
      this.criterias = data;
    })
  }
  getTrashedCriteriaList(){
    this._criteriasService.getTrash().subscribe(data =>{
      console.log(data)
      this.trashCriterias = data;
    })
  }
  restoreFunction(id){
    this._criteriasService.restoreTrash(id).subscribe(data =>{
      console.log(data)
      location.reload();
      // this.router.navigate(['/base/criteria'])
    })
  }

  initEditForm(){
    this.editCriteria = new FormGroup({
      id:new FormControl(this.editableCriteriaObj.id),
      name:new FormControl(this.editableCriteriaObj.name),
      type_id:new FormControl(this.editableCriteriaObj.type_id),
    });
  }

  modalEditRef: BsModalRef;
  openEditModal(selected,template: TemplateRef<any>){
    console.log("testing",selected)
    this.editableCriteriaObj = selected;
    this.initEditForm();
    this.modalEditRef = this.modalService.show(template);
  }

  closeEditModal(){
    this.modalEditRef.hide();
    //this.initForm();
  }

  
  edit(value) {
    console.log("value",value)
    this._criteriasService.editCriteria(value,this.editableCriteriaObj.id)
      .subscribe(result => {
        console.log(result);
        this.modalEditRef.hide();
        if(result){
          this.alert.fireAlert("success","Data Updated successfully","");
          this.getCriteriaList();
          //this.initEditForm();
        }else{
          this.alert.fireAlert("error","There is an error when update this data","");
          this.getCriteriaList();
          //this.initEditForm();
        }
      });
  }


  

}
