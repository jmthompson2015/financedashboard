class SymbolsUI extends React.Component
{
   constructor(props)
   {
      super(props);

      const initialSymbolString = (this.props.initialSymbolString ? this.props.initialSymbolString : "AAPL,AMZN,INTC,KO,T,VEIRX,VSMGX,VSGAX");

      this.state = {
         symbolString: initialSymbolString
      };
   }

   render()
   {
      LOGGER.debug("SymbolsUI.render()");

      const symbolsInput = ReactDOMFactories.input(
      {
         id: "symbolsUI",
         type: "text",
         value: this.state.symbolString,
         onChange: this.handleChange.bind(this),
      });

      const submitButton = ReactDOMFactories.button(
      {
         onClick: this.handleSubmit.bind(this),
      }, "Submit");

      const rows = [];
      const cells = [];

      cells.push(ReactDOMFactories.td(
      {
         key: "cell" + cells.length
      }, "Symbols: "));
      cells.push(ReactDOMFactories.td(
      {
         key: "cell" + cells.length
      }, symbolsInput));
      cells.push(ReactDOMFactories.td(
      {
         key: "cell" + cells.length
      }, submitButton));
      rows.push(ReactDOMFactories.tr(
      {
         key: "row" + rows.length
      }, cells));

      rows.push(ReactDOMFactories.tr(
      {
         key: "row" + rows.length
      }, ReactDOMFactories.td(
      {
         className: "example",
         colSpan: 3,
      }, "Example: AAPL,AMZN,INTC,KO,T,VEIRX,VSMGX,VSGAX")));

      return ReactDOMFactories.table(
      {}, ReactDOMFactories.tbody(
      {}, rows));
   }
}

SymbolsUI.prototype.handleChange = function(event)
{
   LOGGER.debug("SymbolsUI.handleChange()");

   this.setState(
   {
      symbolString: event.target.value,
   });
};

SymbolsUI.prototype.handleSubmit = function()
{
   LOGGER.debug("SymbolsUI.handleSubmit()");

   this.props.callback(this.state.symbolString);
};

export default SymbolsUI;