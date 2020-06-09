<template>
  <div class="container">
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
      ></v-data-table>
    </v-card-text>
    <v-card class="m-3">
      <canvas id="planet-chart"></canvas>
    </v-card>
  </div>
</template>
<script>
import Chart from "chart.js";
import {
  planetChartData,
  meanSquared,
  meanError,
  gradient,
  adder,
  training,
  learningRate,
  RealGrad,
  RealYintercept
} from "../plugins/chart-data.js";

export default {
  data() {
    return {
      planetChartData: planetChartData,
      headers: [
         {
          text: "Actual Formula",
          value: "InitialFormula",
          align: 'start',
        },
        {
          text: "Calculated",
          value: "FormulaC"
        },
        {
          text: "Mean squared Error",
          value: "meanSquared"
        },
        { text: "Mean Error ", value: "meanError" },
        { text: "Learning Rate ", value: "learningRate" },
        { text: "Training Level", value: "training" },

      ],
      desserts: [
        {
          FormulaC: `y = ${gradient}x + ${adder}`,
          InitialFormula: `y = ${RealGrad}x + ${RealYintercept}`,
          meanSquared: meanSquared,
          meanError: meanError,
          learningRate: learningRate,
          training: training,
        }
      ]
    };
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      // eslint-disable-next-line no-unused-vars
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    this.createChart("planet-chart", this.planetChartData);
  }
};
</script>
