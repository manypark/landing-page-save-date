import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegisterFlightsForm {

    public buildForm( formBuild: FormBuilder ) : FormGroup {

        return formBuild.group({
            data_arrival    : [ '', [ Validators.required ] ],
            data_return     : [ '', [ Validators.required ] ],
            time_arrival    : [ '', [ Validators.required ] ],
            time_return     : [ '', [ Validators.required ] ],
            airline_arrival : [ '', [ Validators.required ] ],
            airline_return  : [ '', [ Validators.required ] ],
            origen          : [ '', [ Validators.required ] ],
            destiny         : [ '', [ Validators.required ] ],
        });

    }

}
