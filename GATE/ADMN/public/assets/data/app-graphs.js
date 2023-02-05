let gr={};
gr.r=()=>{
  return (Math.floor(Math.random() * (1 + 50 - 20))) + 10;
}
gr.live=(id,datas,opts,colors)=>{

  for(let i in opts){
    opts[i].data=datas[i];
  }

  //console.log(id);

  $.plot(
    $("#"+id),
    opts,
    {
      colors: colors,
      series: {
        lines: {
          show: true,
          lineWidth: 1, 
          fill: true,
          fillColor: { colors: [{ opacity: 0.35 }, { opacity: 0.35}] },
        },
        fillColor: "rgba(0,0,0,0.3)",
        points: {
          show: false,
          fill: true
        },
        shadowSize: 0
      },
      legend:{
        show: true
      },
      grid: {
        show: true,
        margin: {
          top: -20,
          bottom: 0,
          left: 0,
          right: 0,
        },
        labelMargin: 0,
        axisMargin: 0,
        hoverable: false,
        clickable: false,
        tickColor: "rgba(0,0,0,0.1)",
        borderWidth: 0,
        minBorderMargin: 0
      },
      xaxis: {
        autoscaleMargin: 0,
        ticks: 11,
        tickDecimals: 0
      },
      yaxis: {
        autoscaleMargin: 0.2,
        ticks: 5,
        tickDecimals: 0
      }
    }
  );
}
//widget_linechart_live();