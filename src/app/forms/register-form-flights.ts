import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegisterFlightsForm {

    public buildForm( formBuild: FormBuilder ) : FormGroup {

        return formBuild.group({
            data_arrival    : [ '10/18/2023', [ Validators.required ] ],
            data_return     : [ '10/20/2023', [ Validators.required ] ],
            time_arrival    : [ '12:00', [ Validators.required ] ],
            time_return     : [ '01:00', [ Validators.required ] ],
            airline_arrival : [ 'volaris', [ Validators.required ] ],
            airline_return  : [ 'volaris', [ Validators.required ] ],
            origen          : [ 'Mexico', [ Validators.required ] ],
            destiny         : [ '', [ Validators.required ] ],
        });

    }

}
