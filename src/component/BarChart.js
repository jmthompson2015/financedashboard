import InputValidator from "../util/InputValidator.js";

class BarChart extends React.Component
{
   constructor(props)
   {
      super(props);

      this.state = {};
   }

   componentDidMount()
   {
      this.initializeChart(this.props);
   }

   componentWillUnmount()
   {
      const chart = this.state.chart;
      chart.destroy();
   }

   componentWillReceiveProps(nextProps)
   {
      const chart = this.state.chart;
      chart.destroy();
      this.initializeChart(nextProps);
   }

   render()
   {
      InputValidator.validateNotNull("chartCanvasId", this.props.chartCanvasId);
      InputValidator.validateNotNull("data", this.props.data);
      InputValidator.validateNotNull("options", this.props.options);

      const chartCanvasId = this.props.chartCanvasId;

      return ReactDOMFactories.canvas(
      {
         id: chartCanvasId,
         className: "chart",
         width: 300,
         height: 200,
      });
   }

   initializeChart(nextProps)
   {
      const element = ReactDOM.findDOMNode(this);
      const ctx = element.getContext("2d");
      const chart = new Chart(ctx,
      {
         type: "bar",
         data: nextProps.data,
         options: nextProps.options,
      });
      this.state.chart = chart;
   }

   updatePoints(nextProps, chart)
   {
      nextProps.data.datasets.forEach(function(dataset, setIndex)
      {
         dataset.data.forEach(function(point, pointIndex)
         {
            chart.data.datasets[setIndex].data[pointIndex] = point;
         }, this);
      }, this);
   }
}

export default BarChart;