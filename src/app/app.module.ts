import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { StudentFormComponent } from '@dialogs/student-form/student-form-dialog.component';

import { GenderPipe } from '@pipes/gender.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from '@pages/home/home.component';
import { SearchComponent } from '@components/search/search.component';
import { StudentListComponent } from '@components/student-list/student-list.component';
import { ConfirmDialogComponent } from '@dialogs/confirm/confirm-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		SearchComponent,
		StudentListComponent,
		ConfirmDialogComponent,
		StudentFormComponent,
		GenderPipe,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgbModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		MatTableModule,
		MatIconModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatToolbarModule,
		MatProgressBarModule,
		MatDialogModule,
		MatSelectModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
