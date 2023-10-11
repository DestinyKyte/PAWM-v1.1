import { Injectable } from '@angular/core';
import { Chart } from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
 
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
      ]
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
        categories:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      series: [
        {
          name: 'Quality',
          data: [],
          color: "Red"
        } as any
      ]
    });
  
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
      ]
    })
   

   public getDayChart(){
    return this.dayChart;
   }


}
