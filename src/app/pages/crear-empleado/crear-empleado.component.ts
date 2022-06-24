import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {

  //propiedades
  empleadoForms:FormGroup;
  enviado=false;
  empleadoDepartamento: any =['Administracion','Finanzas','Recursos Humanos','TI','Ventas'];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private empleadoService: EmpleadoService
  ) {
    this.mainForm();
   }

  ngOnInit(): void {
  }

  mainForm(){
    this.empleadoForms=this.formBuilder.group({
      nombre: ['',[Validators.required]],
      departamento:['',[Validators.required]],
      email:['',[
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ],
    ],
      telefono: ['',[Validators.required,Validators.pattern('^[0-9]+$')]]
    })
  };

  //seleccionar un elemento con un select
  actualizarDepartamento(d){
    this.empleadoForms.get('departamento').setValue(d,{
      onlySelf:true

    });
  }

  get myForm(){
    return this.empleadoForms.controls;
  }

  //metodo que se ejecuta cuando el usuario envia un formulario
  onSubmit(){
    this.enviado=true;
    if(!this.empleadoForms.valid){
      return false;
    }else{
      return this.empleadoService.agregarEmpleado(this.empleadoForms.value).subscribe({
        complete:()=>{
          console.log('Empleado agregado correctamente'),
          this.ngZone.run(()=>this.router.navigateByUrl('/listar-empleados'));
        },
        error:(e)=>{
          console.log(e);
        }
      });
    }
  }
}
