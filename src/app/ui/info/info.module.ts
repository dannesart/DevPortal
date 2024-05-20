import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InfoComponent } from "./info.component";

@NgModule({
    imports: [CommonModule],
    exports: [InfoComponent],
    declarations: [InfoComponent]
})
export class InfoModule{}