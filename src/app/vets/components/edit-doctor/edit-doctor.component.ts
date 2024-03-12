import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Clinic } from '../../../shared/models/clinic';
import { Vet } from '../../models/vet';
import { VetService } from '../../services/vet.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.css'
})
export class EditDoctorComponent {

  clinic = new Clinic()
  vetData = new Vet();

  constructor(private vetService: VetService, private route: Router) { }
  getVet() {
    this.vetService.getVetDetails(701).subscribe(data => this.vetData = data);
  }

  updateDetails() {
    this.vetService.editVetDetails(701, this.vetData).subscribe(data => this.vetData = data);
    alert("Updated Successfully")
    this.route.navigate(['/dashboard/profilevet']);
  }
}
