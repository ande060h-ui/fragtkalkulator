export function AssumptionsBox() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <h3 className="mb-2 font-semibold">Forudsætninger og antagelser</h3>
      <ul className="list-disc space-y-1 pl-5">
        <li>Kunde: Birgers Møbler · Rute: Viborg → San Francisco · Speditør: LEA Express · Rederi: A-Line.</li>
        <li>Alle USD-beløb omregnes til DKK med den redigerbare valutakurs øverst på siden.</li>
        <li>LEA Express' avance beregnes som en procentsats af hele kostprisen (søfragt + tillæg + lokale gebyrer/trucking) for alle tre tilbud.</li>
        <li>Tilbud 1 (LCL) faktureres pr. w/m (weight/measurement) – da der ikke er oplyst vægtdata, anvendes cbm som w/m-grundlag, og THC beregnes ud fra volumen (kr./cbm, dog minimum 275 kr.).</li>
        <li>Tilbud 1's godsafgift i havn (152 kr.) pålægges pr. sending, og de 4 ugentlige sendinger á 8 cbm (32 cbm/md) lægges sammen til en månedlig kostpris.</li>
        <li>For tilbud 2 og 3 vælges trucking-rute (Århus-Viborg-Århus eller Århus-Viborg-Hamborg); fuelfee (12%) beregnes af den valgte truckingpris, og feeder-kompensationen (kun ved Hamborg-ruten) fratrækkes efter fuelfee er beregnet af bruttoprisen.</li>
        <li>"Pris pr. cbm" for FCL-tilbud beregnes ud fra det redigerbare felt "Udnyttet volumen" (standard: fuld kapacitet, 33 cbm for 20' og 67 cbm for 40'), så prisen afspejler den faktiske udnyttelse af containeren.</li>
        <li>Tilbud 2 og 3 er månedlige enkeltsendinger (1 container/md), mens tilbud 1 er 4 sendinger/md – alle mængder kan justeres i felterne ovenfor.</li>
      </ul>
    </div>
  )
}
