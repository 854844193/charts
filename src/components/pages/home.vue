<template>
  <div class="page">
    <!-- 左边导航 -->
    <div class="leftNav">
      <p v-for="item in navList" :key="item">{{ item }}</p>
    </div>
    <!-- 右边图表区 -->
    <div class="rightData">
      <!-- header标题 -->
      <div class="header">
        <h2>医共体信息统计平台</h2>
      </div>
      <!-- 图表区 -->
      <div class="main">
        <div class="row">
          <!-- 左边部分 -->
          <div class="col-md-4">
            <!-- 左上方总数部分 -->
            <div>
              <span class="countName">居民健康档案</span>
              <span class="numItem" v-for="(item, index) in jmNum" :key="index">
                {{ item }}
              </span>
            </div>
            <!-- 上半部分 -->
            <div class="cardBox">
              <div class="row">
                <div class="col-md-6">
                  <div style="height: 280px" id="pie1"></div>
                </div>
                <div class="col-md-6">
                  <div style="height: 280px" id="pie2"></div>
                </div>
              </div>
            </div>
            <!-- 下半部分 -->
            <div class="cardBox bottomChart">
              <div style="height: 100%" id="stack"></div>
            </div>
            <!-- <div class="row cardBox"></div> -->
          </div>
          <!-- 中间家庭签约人数、地图部分 -->
          <div class="col-md-4 middleMap">
            <h3 class="perNums">家庭医生签约人数</h3>
            <div class="amount">
              <span
                class="numItem"
                v-for="(item, index) in amount"
                :key="index"
              >
                {{ item }}
              </span>
              <span class="countunit">万人</span>
            </div>
            <div class="chinaMap" id="mapContainer"></div>
          </div>
          <!-- 右边部分 -->
          <div class="col-md-4">
            <!-- 右上方总数部分 -->
            <div>
              <span class="countName">居民健康档案</span>
              <span class="numItem" v-for="(item, index) in jmNum" :key="index">
                {{ item }}
              </span>
            </div>
            <!-- 上半部分 -->
            <div class="cardBox">
              <div style="height: 100%" id="radar"></div>
            </div>
            <!-- 下半部分 -->
            <div class="cardBox bottomChart">
              <div style="height: 100%" id="columnar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "echarts/map/js/china.js";
import chinaJson from "echarts/map/json/china.json";
export default {
  data() {
    return {
      amount: [],
      jmNum: [],
      allMount: "5987453",
      jmMount: "321568",
      navList: [
        "居民健康档案",
        "家庭医生签约",
        "双向转诊",
        "影像中心",
        "临检中心",
      ],
    };
  },
  methods: {
    // 地图
    drawMap() {
      this.$echarts.registerMap("china", chinaJson);
      var myChart = this.$echarts.init(document.getElementById("mapContainer"));
      var option = {
        backgroundColor: "transparent",
        grid: [
          { x: "55%", y: "5%", width: "40%", height: "90%" },
          //  { x: '50%', bottom: '5%', width: '40%', height: '25%' }
        ],
        //布局e
        geo: {
          show: true,
          map: "china",
          zoom: 1, //地图绽放
          scaleLimit: 2,
          label: {
            show: true,
            color: "#fff",
            align: "left",
            borderWidth: "#ff6a00",
            verticalAlign: "middle",
            emphasis: {
              show: false,
            },
          },
          roam: true, //是否开启鼠标缩放和平移漫游
          itemStyle: {
            normal: {
              areaColor: "transparent",
              borderColor: "#3fdaff",
              borderWidth: 1,
              shadowColor: "rgba(63, 218, 255, 0.5)",
              shadowBlur: 30,
            },
            emphasis: {
              areaColor: "#2B91B7",
              color: "#fff",
            },
          },
        },
      };
      // 图表自适应方法
      this.$nextTick(() => {
        myChart.resize();
      });
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    // 环形图1
    drawpie1() {
      var chartDom = document.getElementById("pie1");
      var myChart = this.$echarts.init(chartDom);
      var option = {
        title: {
          text: "居民健康档案",
          left: "left",
          top: "10",
          textStyle: {
            color: "rgba(0,230,245,0.7)",
          },
        },
        tooltip: {
          trigger: "item",
        },
        // legend: {
        //   top: "5%",
        //   left: "center",
        // },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "75%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: "40",
            //     fontWeight: "bold",
            //   },
            // },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 1048,
                name: "搜索引擎",
                itemStyle: { color: "#5470c6" },
              },
              { value: 735, name: "直接访问", itemStyle: { color: "#91cc75" } },
              { value: 580, name: "邮件营销", itemStyle: { color: "#fac858" } },
              { value: 484, name: "联盟广告", itemStyle: { color: "#ee6666" } },
              { value: 300, name: "视频广告", itemStyle: { color: "#73c0de" } },
            ],
          },
        ],
      };
      // 图表自适应方法
      this.$nextTick(() => {
        myChart.resize();
      });
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    // 环形图2
    drawpie2() {
      var chartDom = document.getElementById("pie2");
      var myChart = this.$echarts.init(chartDom);
      var option = {
        tooltip: {
          trigger: "item",
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "75%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 1048,
                name: "搜索引擎",
                itemStyle: { color: "#5470c6" },
              },
              { value: 735, name: "直接访问", itemStyle: { color: "#91cc75" } },
              { value: 580, name: "邮件营销", itemStyle: { color: "#fac858" } },
              { value: 484, name: "联盟广告", itemStyle: { color: "#ee6666" } },
              { value: 300, name: "视频广告", itemStyle: { color: "#73c0de" } },
            ],
          },
        ],
      };
      // 图表自适应方法
      this.$nextTick(() => {
        myChart.resize();
      });
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    // 雷达图
    drawRadar() {
      var chartDom = document.getElementById("radar");
      var myChart = this.$echarts.init(chartDom);
      var option = {
        title: {
          text: "临检中心",
          left: "15",
          top: "10",
          textStyle: {
            color: "rgba(0,230,245,0.7)",
          },
        },
        tooltip: {
          trigger: "item",
        },
        radar: {
          indicator: [
            { name: "销售", max: 6500 },
            { name: "管理", max: 16000 },
            { name: "信息技术", max: 30000 },
            { name: "客服", max: 38000 },
            { name: "研发", max: 52000 },
            { name: "市场", max: 25000 },
          ],
          radius: "70%",
          nameGap: 10,
          splitNumber: 4,
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: [
                "rgba(230,230,230,0.2)",
                "rgba(230,230,230,0.15)",
                "rgba(230,230,230,0.1)",
                "rgba(230,230,230,0.05)",
              ],
              shadowColor: "rgb(230,230,230)", // 圆颜色
              shadowBlur: 10,
            },
          },
        },
        series: [
          {
            name: "",
            type: "radar",
            symbolSize: 0,
            data: [
              {
                value: [4875, 12000, 21000, 8000, 48000, 13000],
                name: "预算分配",
              },
            ],
            lineStyle: {
              color: "aqua",
              width: 0.8,
            },
            areaStyle: {
              color: "aqua",
              opacity: 0.4,
            },
          },
        ],
      };
      // 图表自适应方法
      this.$nextTick(() => {
        myChart.resize();
      });
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    // 堆叠折线图
    drawStack() {
      var chartDom = document.getElementById("stack");
      var myChart = this.$echarts.init(chartDom);
      var option = {
        title: {
          text: "影像中心",
          left: "15",
          top: "10",
          textStyle: {
            color: "rgba(0,230,245,0.7)",
          },
        },
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        // legend: {
        //   data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
        // },
        grid: {
          left: "20",
          right: "40",
          top: "50",
          bottom: "10",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              { value: "8:00", textStyle: { color: "#fff" } },
              { value: "9:00", textStyle: { color: "#fff" } },
              { value: "10:00", textStyle: { color: "#fff" } },
              { value: "11:00", textStyle: { color: "#fff" } },
              { value: "12:00", textStyle: { color: "#fff" } },
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        series: [
          {
            name: "Line 1",
            type: "line",
            // stack: "总量",
            smooth: true,
            lineStyle: {
              width: 1,
            },
            labelLine: {
              show: false,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(128, 255, 165,0.5)",
                },
                // {
                //   offset: 1,
                //   color: "rgba(1, 191, 236,0.2)",
                // },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 320, 50],
          },
          {
            name: "Line 2",
            type: "line",
            // stack: "总量",
            smooth: true,
            lineStyle: {
              width: 1,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0, 221, 255)",
                },
                // {
                //   offset: 1,
                //   color: "rgba(0, 221, 255,0.5)",
                // },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [500, 282, 350, 600, 213],
          },
          {
            name: "Line 3",
            type: "line",
            // stack: "总量",
            smooth: true,
            lineStyle: {
              width: 1,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(55, 162, 255)",
                },
                // {
                //   offset: 1,
                //   color: "rgba(55, 162, 255,0.1)",
                // },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 132, 201, 800, 500],
          },
          {
            name: "Line 4",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 1,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.4,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 0, 135)",
                },
                {
                  offset: 1,
                  color: "rgba(135, 0, 157)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 402, 231, 134, 190],
          },
          {
            name: "Line 5",
            type: "line",
            // stack: "总量",
            smooth: true,
            lineStyle: {
              width: 1,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.2,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 191, 0)",
                },
                // {
                //   offset: 1,
                //   color: "rgba(224, 62, 76)",
                // },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 302, 181, 234, 210],
          },
        ],
      };
      this.$nextTick(() => {
        myChart.resize();
      });
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    // 柱形图
    drawColumnar() {
      var chartDom = document.getElementById("columnar");
      var myChart = this.$echarts.init(chartDom);
      var option = {
        title: {
          text: "双向转诊",
          left: "15",
          top: "10",
          textStyle: {
            color: "rgba(0,230,245,0.7)",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "20",
          right: "20",
          top: "50",
          bottom: "10",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              width: 0.5,
            },
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
            lineStyle: {
              color: "#2b4490",
              width: 2,
            },
          },
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            data: [
              {
                value: "120",
                label: {
                  show: true,
                  position: "top",
                  color: "#fff",
                  fontStyle: "italic",
                  fontWeight: "bold",
                },
                itemStyle: { color: "rgba(0,230,245,0.7)" },
              },
              {
                value: "200",
                label: {
                  show: true,
                  position: "top",
                  color: "#fff",
                  fontStyle: "italic",
                  fontWeight: "bold",
                },
                itemStyle: { color: "rgba(0,230,245,0.7)" },
              },
              {
                value: "150",
                label: {
                  show: true,
                  position: "top",
                  color: "#fff",
                  fontStyle: "italic",
                  fontWeight: "bold",
                },
                itemStyle: { color: "rgba(0,230,245,0.7)" },
              },
              {
                value: "80",
                label: {
                  show: true,
                  position: "top",
                  color: "#fff",
                  fontStyle: "italic",
                  fontWeight: "bold",
                },
                itemStyle: { color: "rgba(0,230,245,0.7)" },
              },
              {
                value: "70",
                label: {
                  show: true,
                  position: "top",
                  color: "#fff",
                  fontStyle: "italic",
                  fontWeight: "bold",
                },
                itemStyle: { color: "rgba(0,230,245,0.7)" },
              },
              {
                value: "110",
                label: {
                  show: true,
                  position: "top",
                  color: "#fff",
                  fontStyle: "italic",
                  fontWeight: "bold",
                },
                itemStyle: { color: "rgba(0,230,245,0.7)" },
              },
              {
                value: "130",
                label: {
                  show: true,
                  position: "top",
                  color: "#fff",
                  fontStyle: "italic",
                  fontWeight: "bold",
                },
                itemStyle: { color: "rgba(0,230,245,0.7)" },
              },
            ],
          },
        ],
      };
      this.$nextTick(() => {
        myChart.resize();
      });
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
  mounted() {
    // console.log(this.allMount.split(''))
    // 顶部三个数据切成数组
    this.amount = this.allMount.split("");
    this.jmNum = this.jmMount.split("");
    // 加载图表
    this.drawMap();
    this.drawpie1();
    this.drawpie2();
    this.drawRadar();
    this.drawStack();
    this.drawColumnar();
  },
};
</script>

<style scoped>
.page {
  display: flex;
}
.page .leftNav {
  width: 14%;
  height: 100vh;
  background: #1b315e;
}
.leftNav p {
  color: #fcfcfc;
  margin: 0;
  padding: 10px 0;
}
.leftNav p:first-child {
  margin-top: 80px;
}
.leftNav p:hover {
  color: aqua;
  cursor: pointer;
  background: rgba(16, 17, 41, 0.5);
}
.page .rightData {
  width: 96%;
}
.rightData .header {
  height: 80px;
  padding-top: 40px;
  background: rgba(0, 100, 150, 0.8);
}
.header h2 {
  color: #fcfcfc;
  text-align: center;
}
.main {
  margin-top: 20px;
}
.main .row {
  margin: 0;
}
.middleMap {
  background: rgba(238, 238, 238, 0.05);
  box-sizing: border-box;
  padding-top: 10px;
  margin-top: 60px;
}
.chinaMap {
  height: 500px;
  margin-top: 20px;
}
.cardBox {
  height: 280px;
  border: 1px solid aqua;
  margin-top: 20px;
}
.bottomChart {
  margin-top: 100px;
}

.perNums {
  color: aqua;
  margin-bottom: 30px;
}
.countName {
  font-size: 20px;
  font-weight: bold;
  color: #5470c6;
}
.numItem {
  font-size: 40px;
  font-family: "UnidreamLED";
  color: aqua;
  height: 45px;
  line-height: 45px;
  width: 30px;
  margin: 0 2px;
  display: inline-block;
  background: rgba(0, 100, 150, 0.4);
}
.countunit {
  font-size: 24px;
  font-weight: bold;
  color: #5470c6;
}
</style>