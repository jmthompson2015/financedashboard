import DataTable from "../component/DataTable.js";

function mapStateToProps(state, ownProps)
{
   return (
   {
      symbols: state.symbols,
      keyStatistics: state.keyStatistics,
      performance: state.performance,
   });
}

export default ReactRedux.connect(mapStateToProps)(DataTable);