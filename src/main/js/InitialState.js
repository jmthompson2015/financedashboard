define(function()
{
   "use strict";
   // var InitialState = {};
   //
   // InitialState.create = function()
   // {
   //     return (
   //     {
   //         symbols: [],
   //
   //         // ////////////////////////////////////////////////////////////////
   //         // Entities.
   //         keyStatistics: {
   //         // symbol: data
   //         },
   //
   //         performance: {
   //         // symbol: data
   //         }
   //     });
   // };

   function InitialState()
   {
      this.symbols = [];
      this.keyStatistics = {
         // symbol: data
      };
      this.performance = {
         // symbol: data
      };
   }

   return InitialState;
});
