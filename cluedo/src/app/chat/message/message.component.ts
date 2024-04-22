import { Component, Inject} from "@angular/core";
import { Input } from "@angular/core";


@Component({
    selector: "app-message",
    standalone: true,
    imports: [],
    templateUrl: "./message.component.html",
    styleUrl: "../../../../../../front-end-shared/css/Game/Chat/message.css"
    })

export class MessageComponent {
    @Input() text: string = "";
    @Input() username: string = "";
    @Input() type: string = "";
    @Input() character: string = "";

    constructor() {}
}