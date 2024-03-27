import { Component, OnInit } from '@angular/core';
import { Chart,BarController,CategoryScale,LinearScale, BarElement } from 'chart.js';
import { PredictionService } from '../../services/prediction.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-predictons',
  templateUrl: './predictons.component.html',
  styleUrl: './predictons.component.css'
})
export class PredictonsComponent implements OnInit {
  constructor(private prediction:PredictionService,private route:ActivatedRoute){
    Chart.register(BarController,CategoryScale,LinearScale,BarElement)
  }
  navbarColor:string = '#211E1E'
  chart:any
  predictedChart:any
  fileTitle:string=''
  data:any[]=[];
  predictionData:any[]=[];
  predictionMonth:any
  predictionSales:any
  month:any
  sales:any
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next:(params:any)=>{
        this.fileTitle = params['title']

      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    this.prediction.getcsvData(this.fileTitle).subscribe({
      next:(response:any)=>{

        // console.log(response);
        this.data = response
        console.log(this.data);

        
        
         this.month = this.data.map(item=>item.Month)
         this.sales = this.data.map(item=>Number(item['Perrin Freres monthly champagne sales millions']))
        //  console.log(this.month);
        //  console.log(this.sales);
         
         
         this.createChart()


        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    this.prediction.getprediction(this.fileTitle).subscribe({
      next:(response:any)=>{
        console.log(response);
        // this.predictionData = response
        this.predictionData = JSON.parse(response)
        console.log(typeof this.predictionData);
        
        this.predictionMonth = this.predictionData.map(item=>item.date)
        this.predictionSales = this.predictionData.map(item=>item.PredictedSales)
        this.createPredictionChart()
        
      }
    })
  }

  createChart(){
    this.chart = new Chart('MyChart',{
      type:'bar',
      data:{
        labels:this.month,
        datasets:[{
          label:'Perrin Freres monthly champagne sales millions', 
          data:this.sales,
          backgroundColor:'rgba(54, 162, 235, 0.2)',
          borderColor:'rgba(54, 162, 235, 1)',
          borderWidth:1

        }]
      },
      options:{
        aspectRatio:2.5
      }
    })

  }
  createPredictionChart(){

    this.predictedChart = new Chart('chart',{
      type:'bar',
      data:{
        labels:this.predictionMonth,
        datasets:[{
          label:'Perrin Freres monthly champagne sales millions', 
          data:this.predictionSales,
          backgroundColor:'rgba(54, 162, 235, 0.2)',
          borderColor:'rgba(54, 162, 235, 1)',
          borderWidth:1

        }]
      },
      options:{
        aspectRatio:2.5
      }
    })
  }

}
