import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegisterForm {

    public buildForm( formBuild: FormBuilder ) : FormGroup {

        return formBuild.group({
            name            : [ '', [Validators.required ] ],
            email           : [ '', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
            resident        : [ 'United kingdom', [Validators.required ] ],
            otherResident   : [ '', [] ],
            phone           : [ '', [Validators.required, Validators.minLength(10),Validators.maxLength(15), ] ],
            lada            : [ '(+52)', [Validators.required] ],
            otherLada       : [ '', [ Validators.maxLength(5)] ],
        });

    }

}
