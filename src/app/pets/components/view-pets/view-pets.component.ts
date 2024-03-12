import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AppointmentService } from '../../../appointments/services/appointment-service';
import { Vet } from '../../../vets/models/vet';
import { Appointment } from '../../../appointments/models/appointment';

@Component({
  selector: 'app-view-pets',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './view-pets.component.html',
  styleUrl: './view-pets.component.css'
})
export class ViewPetsComponent {
  id: number = 0
  constructor(private appointmentService: AppointmentService, private rt: ActivatedRoute) { }


  onCall() {
    console.log('Call button clicked');
  }

  onChat() {
    console.log('Chat button clicked');
  }

  onClose() {
    console.log('Close button clicked');
  }

  onCancel() {
    console.log('Cancel button clicked');
  }

  onSubmit() {
    console.log("called")
  }

  cancelSubmit() {
    console.log(this.id);

    this.appointmentService.cancel_appointment(this.id).subscribe(
      response => console.log('Cancelled Successfully', response),
      error => console.error('Error', error)
    );
  }
  closeSubmit() {
    this.appointmentService.close_appointment(this.id).subscribe(
      response => console.log('Closed Successfully', response),
      error => console.error('Error', error)
    );
  }


  vets: Vet[] = []
  doctorName: string = ''
  appointment: Appointment = new Appointment

  ngOnInit(): void {
    this.rt.queryParams.subscribe(params => {
      this.id = params['data'];
    })
    this.appointmentService.getAppointmentDetails(this.id).subscribe(data => {
      this.appointment = data
      console.log("ada" + this.appointment);
    },
      (error) => {
        console.log(error);

      })
    this.appointmentService.getAllVets().subscribe(data => {
        this.vets = data;
        console.log(data);
      })
  }
  updateSubmit(data: Appointment) {
    data.appointmentId = this.id
    this.appointmentService.editAppointment(this.appointment).subscribe(data => {
      alert("update is completed")
      console.log(data);

    },
      (error) => {
        // alert(error)

      });

    console.log (this.appointment.vetId =Number(this.doctorName));
  }


}
