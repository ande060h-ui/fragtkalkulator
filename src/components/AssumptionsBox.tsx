export function AssumptionsBox() {
  return (
    <div className="border-l-4 border-rust bg-paper-raised p-4 pl-5 text-sm text-ink-soft">
      <h3 className="mb-2 font-display text-base font-semibold text-ink">Noter til beregningen</h3>
      <ul className="list-none space-y-1.5">
        <li>Kunde: Birgers Møbler. Rute: Viborg til San Francisco. Speditør: LEA Express. Rederi: A-Line.</li>
        <li>Alle USD-beløb omregnes til DKK med den redigerbare valutakurs i toppen af siden.</li>
        <li>LEA Express' avance beregnes som en procentsats af hele kostprisen (søfragt, tillæg og lokale gebyrer/trucking) for alle tre tilbud.</li>
        <li>Tilbud 1 faktureres pr. w/m. Da vægtdata ikke er oplyst, bruges cbm som w/m-grundlag, og THC beregnes af volumen (dog minimum 275 kr.).</li>
        <li>Tilbud 1's godsafgift i havn (152 kr.) pålægges pr. sending. De 4 ugentlige sendinger á 8 cbm lægges sammen til en samlet månedlig kostpris.</li>
        <li>For tilbud 2 og 3 vælges trucking-rute. Fuelfee (12%) beregnes af den valgte truckingpris, og feeder-kompensationen (kun ved Hamborg-ruten) fratrækkes efter fuelfee.</li>
        <li>Pris pr. cbm for tilbud 2 og 3 tager udgangspunkt i feltet "Udnyttet volumen" (standard: fuld kapacitet, 33 cbm for 20' og 67 cbm for 40').</li>
        <li>Tilbud 2 og 3 er én sending pr. måned, tilbud 1 er 4 sendinger pr. måned. Alle satser og mængder ovenfor kan justeres.</li>
      </ul>
    </div>
  )
}
