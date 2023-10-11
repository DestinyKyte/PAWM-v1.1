import { Component, OnInit } from '@angular/core';
import { DataSharingSerivce as DataSharingService } from '../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from '../models/entry.model';
import { Session } from '../models/session.model';
import { WorkService } from '../services/letswork.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  goals: String[] = [];
  currentSession!: Session;



  constructor(private dataCenter: DataSharingService, private sessionService: WorkService, private router: Router) {
  }

  ngOnInit() {
    this.currentSession = this.dataCenter.getSession()!;
    this.addGoalsToSummary();
  }


  addGoalsToSummary() {
    var goalsContainer = document.getElementById("session-completed-tasks");
    var addThese = this.dataCenter.getGoals();

    addThese.forEach((goal) => {
      const goalContainer = document.createElement("br"); // Create a new <div> element
      const inputElement = document.createElement("input"); // Create a new <input> element
      inputElement.type = "checkbox";

      const textElement = document.createElement("span"); // Create a new <span> element
      textElement.textContent = <string>goal; // Set the text content of the <span> to the goal text

      goalsContainer?.appendChild(goalContainer);
      goalsContainer!.appendChild(inputElement);
      goalsContainer!.appendChild(textElement);

      //goalsContainer?.appendChild(goalContainer);
    });
  }

  showFocusInput() {
    var output = <HTMLParagraphElement>document.getElementById("session-focus-level-out");
    var input = <HTMLInputElement>document.getElementById("session-focus-level-in");
    output!.textContent = input!.value;

  }
  // EXTRACTING INFORMATION FROM INPUTS

  getSessionDistractions(): string[] {
    var goals: string[] = [];
    // Get a reference to the parent element by its ID
    const parentElement = document.getElementById("session-options");
    if (parentElement) {
      // Convert HTMLCollection to an array
      const childrenArray = Array.from(parentElement.children);
      // Initialize an array to store the checkbox values
      const checkboxValues = [];
      // Iterate over the array of children
      for (const child of childrenArray) {
        // Check if the child is an input element with type "checkbox"
        if (child.tagName === 'INPUT' && (child as HTMLInputElement).type === 'checkbox' && (child as HTMLInputElement).checked) {
          // If it's a checkbox, push its value to the array
          checkboxValues.push((child as HTMLInputElement).value);
          goals = checkboxValues;
        }
      }
    }
    return goals;
  }

  getSessionCompletedGoals(): number {
    var percent; // to store the percentage i receive
    // Get a reference to the parent element by its ID
    const parentElement = document.getElementById("session-completed-tasks");
    if (parentElement) { //verify that the parent exists. which it obviously should
      // Convert HTMLCollection to an array
      const childrenArray = Array.from(parentElement.children);
      // Initialize an array to store the checkbox values
      const checkboxValues = [];
      var unchecked = 0;
      // Iterate over the array of children
      for (const child of childrenArray) {
        // Check if the child is an input element with type "checkbox"
        if (child.tagName === 'INPUT' && (child as HTMLInputElement).type === 'checkbox')
          if ((child as HTMLInputElement).checked) {
            // If it's a checkbox, push its value to the array
            checkboxValues.push((child as HTMLInputElement).value);
          }
          else {
            unchecked++;
          }
      }
      //per evitare il NaN che non è compatibile con JSON
      percent = Math.floor(checkboxValues.length / (checkboxValues.length + unchecked) * 100)

    }
    return Number.isNaN(percent) ? 0 : percent!;
  }

  getFocusInput(): number {
    var input = <HTMLInputElement>document.getElementById("session-focus-level-in");
    var output = parseInt(input!.value);
    return output;
  }

  //i should make this call a track method in the service that posts the entry via HTTP to the backend
  track() {
    var userid = 1
    var goals: number = this.getSessionCompletedGoals(); // goal percentage
    var distractions = this.getSessionDistractions() // distraction string
    var focusLevel = this.getFocusInput();  // focus value 1-10
    var minutes = this.dataCenter.getAllSessions().find(x => x.id === this.currentSession.id)?.minutes // work minutes this session

    // TODO build and entry with these value and send to backend. //should be DONE now
    var entry = {
      userId: userid,
      completedTasks: goals,
      quantity: minutes!,
      quality: focusLevel,
      //distractions: distractions,
    }
    if (minutes != undefined) this.sessionService.trackSession(entry);
    this.navigateTo();
    return entry;
  }
  navigateTo() {
    this.router.navigate(["dashboard"]);
  }
}
