import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HelperService } from '../services/helper.service';
import { HiWatchService } from '../services/hi-watch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-electronic-fence',
  templateUrl: './electronic-fence.component.html',
  styleUrls: ['./electronic-fence.component.css']
})
export class ElectronicFenceComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private hiwatchService: HiWatchService,
    private toasterService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      electornicFence: this.formBuilder.array([this.createItem()])
    });
  }

  ngOnInit() {
  }

  get electornicFence(): FormArray {
    return this.form.get('electornicFence') as FormArray;
  }

  createItem() {
    return this.formBuilder.group({
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      fanwei: ['', [Validators.required]]
    });
  }


  addItem() {
    this.electornicFence.push(this.createItem());
  }
  removeItem(index) {
    this.electornicFence.removeAt(index);
  }

  isInValid(item, key) {
    return item.controls[key].touched && item.controls[key].invalid;
  }

  submitElectornicFence(event) {
    event.preventDefault();
    this.helperService.validateAllFormFields(this.form);
    if (this.form.invalid) {
      return;
    }
    this.hiwatchService.setupElectronicFence(this.electornicFence.value).subscribe((data: any) => {
      if (data.code === 1) {
        this.toasterService.success('Fence added successfully');
      } else {
        this.toasterService.error('Fence for your device can not be added');
      }
      this.electornicFence.clear();
      this.electornicFence.push(this.createItem());
    }, (error) => {
      console.log(error);
    });
  }

}
