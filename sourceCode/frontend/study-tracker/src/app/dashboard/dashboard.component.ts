import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Chart} from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { DataSharingSerivce } from '../services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//TODO being able to see a daily and weekly view of previous years
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
  
  dayChart = new Chart({
    credits: {
      enabled: false
    },
    chart: {
      type: 'line'
    },
    title: {
      text: 'Hours of day'
    },
    xAxis:{
      categories:["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", 
                  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
    },
    series: [
      {
        name: 'Quality',
        data: [],
        color: "Red"            
      } as any
    ],
    accessibility: {
      enabled: false
    }
  })
  
  weekChart = new Chart({
    credits: {
      enabled: false
    },
    chart: {
      type: 'line'
    },
    title: {
      text: 'Days of week'
    },
    xAxis:{
      categories:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ]
    },
    series: [
      {
        name: 'Quality',
        data: [],
        color: "Red"
      } as any
    ],
    accessibility: {
      enabled: false
    }
  })

  yearChart = new Chart({
    credits: {
      enabled: false
    },
    chart: {
      type: 'line'
    },
    title: {
      text: 'Months of year'
    },
    xAxis:{
      categories:["Jenuary", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"]
    },  
    series: [
      {
        name: 'Quality',
        data: [],
        color: "Red"
      } as any
    ],
    accessibility: {
      enabled: false
    }
  })

  userId : any
  
  actualData: any
  
  qualitySerie: any
  quantitySerie: any
  completedTasksSerie: any
  
  //variables that store the values of the last timestamp
  year: any
  weekOfTheYear: any
  dayOfTheYear: any

  setQuality:any
  setQuantity:any
  setCompletedTasks:any

  //variables that store the state of each chart
  dayOfFirstChart: any
  weekOfSecondChart: any 
  yearOfThirdChart: any
  typeOfDataOfFirstChart: any
  typeOfDataOfSecondChart: any
  typeOfDataOfThirdChart: any
  header: any

  
  constructor(
    private httpService: HttpClient,
    private datacenter: DataSharingSerivce, 
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(){
    if(sessionStorage.getItem("accessToken")) {
      this.header = new HttpHeaders().set("CallAgain", "true")

      this.qualitySerie = {
        name: "Quality",
        data: [],
        color: "Red",
        type: 'line'
      }
      
      this.quantitySerie = {
        name: "Quantity",
        data: [],
        color: "Blue",
        type: 'line'
      }
  
      this.completedTasksSerie = {
        name: "Completed tasks",
        data: [],
        color: "Green",
        type: 'line'
      }
  
      this.performTimestamp()
      
      this.dayOfFirstChart = this.dayOfTheYear
      this.weekOfSecondChart = this.weekOfTheYear
      this.yearOfThirdChart = this.year
  
      this.typeOfDataOfFirstChart = "quality"
      this.typeOfDataOfSecondChart = "quality"
      this.typeOfDataOfThirdChart = "quality"
      
      this.showDailyChart(this.typeOfDataOfFirstChart, this.year, this.dayOfFirstChart)
      this.showWeeklyChart(this.typeOfDataOfSecondChart, this.year, this.weekOfSecondChart)
      this.showAnnualChart(this.typeOfDataOfThirdChart, this.yearOfThirdChart)
  
      this.setQuality = "quality"
      this.setQuantity = "quantity"
      this.setCompletedTasks = "completedTasks"
    } else {
      this.openSnackBar("Please login to see your statistics")
      throw new Error("Unauthorized data access attempt")
    }

  }

  ngOnDestroy(){
    this.datacenter.dashboardCounter += 3
  }

  
  showDailyChart(typeOfData: string, year: number, dayOfTheYear: number){
    Highcharts.charts[this.datacenter.dashboardCounter]?.series[0].remove()

    if(typeOfData === "quality"){     
      Highcharts.charts[this.datacenter.dashboardCounter]?.addSeries(this.qualitySerie, true, undefined)
      this.typeOfDataOfFirstChart = "quality"
    } else if (typeOfData === "quantity"){
      Highcharts.charts[this.datacenter.dashboardCounter]?.addSeries(this.quantitySerie, true, undefined)
      this.typeOfDataOfFirstChart = "quantity"
    } else if (typeOfData === "completedTasks"){
      Highcharts.charts[this.datacenter.dashboardCounter]?.addSeries(this.completedTasksSerie, true, undefined)
      this.typeOfDataOfFirstChart = "completedTasks"
    }

    this.httpService.get(environment.apiSecuredUrls+"/dashboard/dataOfDay/"+typeOfData+"/"+year+"/"+dayOfTheYear).subscribe((dataFromBackend)=>{     
      console.log("===> Daily received:" + dataFromBackend)
      this.actualData = dataFromBackend
      Highcharts.charts[this.datacenter.dashboardCounter]?.series[0].setData(this.actualData)
    })
  }

  showWeeklyChart(typeOfData: string, year: number, weekOfTheYear: number){
    Highcharts.charts[this.datacenter.dashboardCounter+1]?.series[0].remove()
    

    if(typeOfData === "quality"){     
      Highcharts.charts[this.datacenter.dashboardCounter+1]?.addSeries(this.qualitySerie, true, undefined)
      this.typeOfDataOfSecondChart = "quality"
    } else if (typeOfData === "quantity"){
      Highcharts.charts[this.datacenter.dashboardCounter+1]?.addSeries(this.quantitySerie, true, undefined)
      this.typeOfDataOfSecondChart = "quantity"
    } else if (typeOfData === "completedTasks"){
      Highcharts.charts[this.datacenter.dashboardCounter+1]?.addSeries(this.completedTasksSerie, true, undefined)
      this.typeOfDataOfSecondChart = "completedTasks"
    }

    this.httpService.get(environment.apiSecuredUrls+"/dashboard/dataOfWeek/"+typeOfData+"/"+year+"/"+weekOfTheYear).subscribe((dataFromBackend)=>{     
      console.log("===> Weekly received:" + dataFromBackend)
      this.actualData = dataFromBackend
      Highcharts.charts[this.datacenter.dashboardCounter+1]?.series[0].setData(this.actualData)
    })
  }

  showAnnualChart(typeOfData: string, year: number){
    Highcharts.charts[this.datacenter.dashboardCounter+2]?.series[0].remove()

    if(typeOfData === "quality"){     
      Highcharts.charts[this.datacenter.dashboardCounter+2]?.addSeries(this.qualitySerie, true, undefined)
      this.typeOfDataOfThirdChart = "quality"
    } else if (typeOfData === "quantity"){
      Highcharts.charts[this.datacenter.dashboardCounter+2]?.addSeries(this.quantitySerie, true, undefined)
      this.typeOfDataOfThirdChart = "quantity"
    } else if (typeOfData === "completedTasks"){
      Highcharts.charts[this.datacenter.dashboardCounter+2]?.addSeries(this.completedTasksSerie, true, undefined)
      this.typeOfDataOfThirdChart = "completedTasks"
    }

    this.httpService.get(environment.apiSecuredUrls+"/dashboard/dataOfYear/"+typeOfData+"/"+year).subscribe((dataFromBackend)=>{     
      console.log("===> Annual received:" + dataFromBackend)
      this.actualData = dataFromBackend
      Highcharts.charts[this.datacenter.dashboardCounter+2]?.series[0].setData(this.actualData)
    })
  }

  eventListenerOfFirstChart(typeOfData : string){
    this.showDailyChart(typeOfData, this.year, this.dayOfFirstChart)
  }

  eventListenerOfSecondChart(typeOfData : string){
    this.showWeeklyChart(typeOfData, this.year, this.weekOfSecondChart)
  }

  eventListenerOfThirdChart(typeOfData : string){
    this.showAnnualChart(typeOfData, this.yearOfThirdChart)
  }
  
  previousDay(){
    if(this.dayOfFirstChart > 1){
      this.dayOfFirstChart = this.dayOfFirstChart - 1
      this.showDailyChart(this.typeOfDataOfFirstChart, this.year, this.dayOfFirstChart)
    } 
  }

  nextDay(){
    if(this.dayOfFirstChart < 365){
      this.dayOfFirstChart = this.dayOfFirstChart + 1
      this.showDailyChart(this.typeOfDataOfFirstChart, this.year, this.dayOfFirstChart)
    }
  }

  previousWeek(){
    if(this.weekOfSecondChart > 1){
      this.weekOfSecondChart = this.weekOfSecondChart - 1
      this.showWeeklyChart(this.typeOfDataOfSecondChart, this.year, this.weekOfSecondChart)
    }
  }

  nextWeek(){
    if(this.weekOfSecondChart < 52){
      this.weekOfSecondChart = this.weekOfSecondChart + 1
      this.showWeeklyChart(this.typeOfDataOfSecondChart, this.year, this.weekOfSecondChart)
    }
  }

  previousYear(){
    this.yearOfThirdChart = this.yearOfThirdChart - 1
    this.showAnnualChart(this.typeOfDataOfThirdChart, this.yearOfThirdChart)
  }

  nextYear(){
    this.yearOfThirdChart = this.yearOfThirdChart + 1
    this.showAnnualChart(this.typeOfDataOfThirdChart, this.yearOfThirdChart)
  }

  performTimestamp(){
    let timestamp = new Date()
    this.year = timestamp.getFullYear()
    this.computeWeekOfTheYear()
    this.computeDayOfTheYear()
  }
  
  computeWeekOfTheYear(){
    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    //siccome lato frontend la settimana inizia di lunedi', devo aggiungere 1 al risultato di getDay per sincronizzarlo con il backend che invece fa iniziare la settimana di domenica
    this.weekOfTheYear = Math.ceil((((currentDate.getTime() - startDate.getTime()) / 86400000) + startDate.getDay() + 1) / 7);
  }

  computeDayOfTheYear(){
    let currentDate = new Date()
    let startDate = new Date(currentDate.getFullYear(), 0, 0)
    this.dayOfTheYear = Math.floor((currentDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24)
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', { duration: 5000 });
  }

}