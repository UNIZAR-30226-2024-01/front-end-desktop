import { Component } from "@angular/core";

@Component({
    selector: "app-message",
    standalone: true,
    imports: [],
    templateUrl: "./message.component.html",
    styleUrl: "../../../../../../front-end-shared/css/Game/Chat/message.css"
    })

export class MessageComponent {
    constructor() {}
    username: string = "";
    text: string = "";
}