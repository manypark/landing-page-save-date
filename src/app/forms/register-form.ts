import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegisterForm {

    public buildForm( formBuild: FormBuilder ) : FormGroup {

        return formBuild.group({
            name            : [ '', [Validators.required ] ],
            email           : [ '', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
            resident        : [ 'United States', [Validators.required ] ],
            otherResident   : [ '', [Validators.required ] ],
            phone           : [ '', [Validators.required, Validators.maxLength(15)] ],
            lada            : [ 'Mexico (+52)', [Validators.required, Validators.maxLength(5)] ],
            otherLada       : [ '', [Validators.required, Validators.maxLength(5)] ],
        });

    }

}
