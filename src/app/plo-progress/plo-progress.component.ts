import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CompetencyLevelDialogComponent } from "../competency-level-dialog/competency-level-dialog.component";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-plo-progress",
  templateUrl: "./plo-progress.component.html",
  styleUrls: ["./plo-progress.component.css"],
})
export class PloProgressComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  summative_colors = ["#E50000", "#ADADAD"];
  formative_colors = ["#4471C4", "#ADADAD"];

  plo = [
    {
      id: "PLO1",
      name_en: "Demonstrates leadership in promoting morality and ethics",
      name_th: "แสดงออกถึงภาวะผู้นำในการส่งเสริมความมีคุณธรรม จริยธรรม",
      tqf: ["1-1"],
      bloom: 1,
      ksa: 3,
      gsp: 1,
      activity_type: [2, 4, 5, 6, 7],
      method_of_assessment: [1, 2, 3, 4, 5],
      activity_assessment: [1, 2],
      order_id: 1,
      summative_xaxis: {
        categories: ["course 1", "course 2", "course 3"],
        tickPlacement: "between",
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      formative_xaxis: {
        categories: ["course 1"],
        tickPlacement: "between",
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      summative: [
        {
          id: "1131071",
          name_th: "ธุรกิจอัจฉริยะและจินตทัศน์สารสนเทศ",
          date: "2021-09-03",
          weight: 20,
          score: 59.0,
        },
        {
          id: "1131074",
          name_th: "โครงงานการวิเคราะห์ข้อมูลเชิงลึกทางธุรกิจ",
          date: "2021-09-03",
          weight: 40,
          score: 65.0,
        },
        {
          id: "1131091",
          name_th: "หลักการเบื้องต้นของการบริหารจัดการข้อมูลองค์กร",
          date: "2021-11-21",
          weight: 40,
          score: 65.0,
        },
      ],
      formative: [
        {
          id: "1131094",
          name_th: "โครงงานการบริหารจัดการข้อมูลองค์กร",
          date: "2021-12-01",
          weight: 0,
          score: 71.0,
        },
      ],
      summative_level: [
        {
          name: "Competency Level",
          data: [2.0, 3.0, 3],
        },
        {
          name: "Cumulative Competency Level",
          data: [2.0, 2.67, 2.8],
        },
      ],
      formative_level: [
        {
          name: "Competency Level",
          data: [4.0],
        },
        {
          name: "Cumulative Competency Level",
          data: [4.0],
        },
      ],
    },
    {
      id: "PLO2",
      name_en: "Express being responsible for work",
      name_th: "แสดงออกถึงการมีความรับผิดชอบในการทำงาน",
      tqf: ["4-1"],
      bloom: 1,
      ksa: 3,
      gsp: 1,
      activity_type: [1, 2, 3, 4, 5, 6, 7],
      method_of_assessment: [1, 2, 3, 4, 5, 9],
      activity_assessment: [1, 2],
      order_id: 2,
      summative_xaxis: {
        categories: ["course 1", "course 2", "course 3", "course 4"],
        tickPlacement: "between",
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      formative_xaxis: {
        categories: [],
        tickPlacement: "between",
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      summative: [
        {
          id: "1131071",
          name_th: "ธุรกิจอัจฉริยะและจินตทัศน์สารสนเทศ",
          date: "2021-09-03",
          weight: 25,
          score: 66.0,
        },
        {
          id: "1131074",
          name_th: "โครงงานการวิเคราะห์ข้อมูลเชิงลึกทางธุรกิจ",
          date: "2021-09-03",
          weight: 25,
          score: 68.0,
        },
        {
          id: "1131091",
          name_th: "หลักการเบื้องต้นของการบริหารจัดการข้อมูลองค์กร",
          date: "2021-11-21",
          weight: 25,
          score: 72.0,
        },
        {
          id: "1131094",
          name_th: "โครงงานการบริหารจัดการข้อมูลองค์กร",
          date: "2021-12-01",
          weight: 25,
          score: 79.0,
        },
      ],
      formative: [],
      summative_level: [
        {
          name: "Competency Level",
          data: [3.0, 3.0, 4.0, 4.0],
        },
        {
          name: "Cumulative Competency Level",
          data: [3.0, 3.0, 3.33, 3.5],
        },
      ],
      formative_level: [],
    },
    {
      id: "PLO3",
      name_en: "Express how to work effectively with others",
      name_th: "แสดงออกถึงการทำงานร่วมกับผู้อื่นได้อย่างมีประสิทธิภาพ",
      tqf: ["4-2"],
      bloom: 1,
      ksa: 3,
      gsp: 1,
      activity_type: [4, 6, 7],
      method_of_assessment: [2, 4, 5],
      activity_assessment: [1, 2],
      order_id: 3,
      summative_xaxis: {
        categories: ["course 1", "course 2"],
        tickPlacement: "between",
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      formative_xaxis: {
        categories: ["course 1", "course 2", "course 3"],
        tickPlacement: "between",
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      summative: [
        {
          id: "1131074",
          name_th: "โครงงานการวิเคราะห์ข้อมูลเชิงลึกทางธุรกิจ",
          date: "2021-09-03",
          weight: 50,
          score: 75.0,
        },
        {
          id: "1131092	",
          name_th: "การบริหารจัดการและการดูแลรักษาข้อมูล",
          date: "2021-11-21",
          weight: 50,
          score: 84.0,
        },
      ],
      formative: [
        {
          id: "1131071",
          name_th: "ธุรกิจอัจฉริยะและจินตทัศน์สารสนเทศ",
          date: "2021-09-03",
          weight: 0,
          score: 65.0,
        },
        {
          id: "1131091",
          name_th: "หลักการเบื้องต้นของการบริหารจัดการข้อมูลองค์กร",
          date: "2021-11-21",
          weight: 0,
          score: 73.0,
        },
        {
          id: "1131094",
          name_th: "โครงงานการบริหารจัดการข้อมูลองค์กร",
          date: "2021-12-01",
          weight: 0,
          score: 81.0,
        },
      ],
      summative_level: [
        {
          name: "Competency Level",
          data: [4.0, 5.0],
        },
        {
          name: "Cumulative Competency Level",
          data: [4.0, 4.5],
        },
      ],
      formative_level: [
        {
          name: "Competency Level",
          data: [3.0, 4.0, 5.0],
        },
        {
          name: "Cumulative Competency Level",
          data: [3.0, 3.5, 4.0],
        },
      ],
    },
    {
      id: "PLO4",
      name_en:
        "Find academic and professional knowledge in digital technology by yourself.",
      name_th:
        "ค้นคว้าหาความรู้เชิงวิชาการและวิชาชีพด้านเทคโนโลยีดิจิทัลได้ด้วยตนเอง",
      tqf: ["2-1"],
      bloom: 6,
      ksa: 1,
      gsp: 2,
      activity_type: [2, 4, 6, 7],
      method_of_assessment: [6, 10, 13, 16],
      activity_assessment: [1, 2, 3],
      order_id: 4,
      summative_xaxis: {
        categories: ["course 1", "course 2", "course 3"],
        tickPlacement: "between",
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      formative_xaxis: {
        categories: [],
        tickPlacement: "between",
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      summative: [
        {
          id: "1131121",
          name_th: "การออกแบบรูปแบบการเรียนรู้และประสบการณ์สารสนเทศ",
          date: null,
          weight: 25,
          score: null,
        },
        {
          id: "1131122",
          name_th: "การพัฒนาสื่อการเรียนรู้",
          date: null,
          weight: 25,
          score: null,
        },
        {
          id: "1131124",
          name_th: "โครงงานการเรียนรู้ดิจิทัล  ",
          date: null,
          weight: 50,
          score: null,
        },
      ],
      formative: [
        {
          id: "1131123",
          name_th: "แพลตฟอร์มการเรียนรู้ดิจิทัล",
          date: null,
          weight: 0,
          score: null,
        },
      ],
      summative_level: [
        {
          name: "Competency Level",
          data: [],
        },
        {
          name: "Cumulative Competency Level",
          data: [],
        },
      ],
      formative_level: [
        {
          name: "Competency Level",
          data: [],
        },
        {
          name: "Cumulative Competency Level",
          data: [],
        },
      ],
    },
  ];

  constructor(public matDialog: MatDialog) {
    this.chartOptions = {
      series: [
        {
          name: "Competency Level",
          data: [2.4, 2.67, 4, 4, 4],
        },
        {
          name: "Cumulative Competency Level",
          data: [3, 3.5, 3.7, 4, 4.5],
        },
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
        fontFamily: "sutregular, Arial, sans-serif",
      },

      colors: ["#1279F0", "#EF8E1C"],
      dataLabels: {
        background: {
          enabled: true,
          foreColor: "#fff",
          padding: 5,
          borderRadius: 50,
        },
        style: {
          // fontSize: "20px",
          fontFamily: "sutregular, Arial, sans-serif",
          fontWeight: "bold",
          //   colors: undefined,
        },
      },
      stroke: {
        curve: "straight",
        width: 3,
      },
      title: {
        // text: "Average High & Low Temperature",
        align: "left",
      },
      grid: {
        padding: {
          top: 15,
        },
        //   borderColor: "#e7e7e7",
        //   row: {
        //     colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        //     opacity: 0.5
        //   }
      },
      markers: {
        size: 5,
        colors: undefined,
        strokeColors: "#fff",
        strokeWidth: 0,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
          size: undefined,
          sizeOffset: 3,
        },
      },
      xaxis: {
        categories: ["course1", "course2", "course3", "course4", "course5"],
        tickPlacement: "between",

        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      yaxis: {
        title: {
          text: "Competency Level",
          style: {
            fontSize: "15px",
          },
        },
        min: 0,
        max: 5,
        forceNiceScale: true,
        // floating: true,
        // decimalsInFloat: ,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: 0,
        offsetX: 0,
        fontSize: "15px",
      },
    };
  }

  ngOnInit() {}

  onOpenDetail() {
    let dialogRef = this.matDialog.open(CompetencyLevelDialogComponent, {
      width: "800px",
    });
  }
}
