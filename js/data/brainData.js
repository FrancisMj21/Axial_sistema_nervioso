window.brainData = {
  planes: {
    axial: {
      title: "Plano axial del encefalo",
      subtitle: "Corte a nivel de ganglios basales",
      note: "Divide el encefalo en porciones superior e inferior."
    },
    coronal: {
      title: "Plano coronal",
      subtitle: "Vista frontal: anterior y posterior",
      note: "Permite comparar ambos hemisferios desde una perspectiva frontal."
    },
    sagital: {
      title: "Plano sagital",
      subtitle: "Vista medial: derecha e izquierda",
      note: "Muestra estructuras de la linea media como cuerpo calloso y tronco encefalico."
    },
    transversal: {
      title: "Plano transversal",
      subtitle: "Equivalente funcional al corte horizontal",
      note: "Util para recorrer niveles desde superior a inferior."
    }
  },
  structures: [
    {
      id: "talamo",
      name: "Talamo",
      color: "#f1c65d",
      x: 47,
      y: 48,
      description: "Gran masa de sustancia gris situada en el diencefalo. Actua como estacion de relevo sensorial hacia la corteza cerebral y participa en alerta, sueno y procesos motores.",
      function: "Transmite e integra informacion sensorial y motora hacia la corteza cerebral.",
      facts: { Ubicacion: "Diencefalo", Composicion: "Sustancia gris", Relacion: "Forma paredes del tercer ventriculo" }
    },
    {
      id: "cuerpo-calloso",
      name: "Cuerpo calloso",
      color: "#cfd55b",
      x: 55,
      y: 39,
      description: "Haz de fibras comisurales que comunica ambos hemisferios cerebrales y coordina informacion entre lados.",
      function: "Integra actividad sensorial, motora y cognitiva entre hemisferios.",
      facts: { Tipo: "Sustancia blanca", Relacion: "Superior a los ventriculos", Glosario: "Cuerpo calloso" }
    },
    {
      id: "capsula-interna",
      name: "Capsula interna",
      color: "#b884ff",
      x: 43,
      y: 52,
      description: "Conjunto compacto de fibras de proyeccion que pasan entre nucleos grises profundos.",
      function: "Conduce informacion motora y sensitiva entre corteza, tronco y medula.",
      facts: { Tipo: "Sustancia blanca", Relacion: "Entre talamo y nucleo lenticular", Importancia: "Via motora principal" }
    },
    {
      id: "nucleo-caudado",
      name: "Nucleo caudado",
      color: "#ef6f78",
      x: 44,
      y: 40,
      description: "Componente de los ganglios basales relacionado con seleccion de acciones y aprendizaje motor.",
      function: "Participa en control motor, habitos y circuitos cognitivos.",
      facts: { Sistema: "Ganglios basales", Porcion: "Cabeza y cola visibles", Relacion: "Junto al ventriculo lateral" }
    },
    {
      id: "putamen",
      name: "Nucleo lenticular",
      color: "#67c98d",
      x: 38,
      y: 58,
      description: "Region lateral de los ganglios basales formada por putamen y globo palido.",
      function: "Modula programas motores y tono muscular.",
      facts: { Componentes: "Putamen y globo palido", Ubicacion: "Lateral al talamo", Sistema: "Ganglios basales" }
    },
    {
      id: "hipocampo",
      name: "Hipocampo",
      color: "#da8d68",
      x: 43,
      y: 70,
      description: "Estructura temporal medial esencial para consolidacion de memoria y aprendizaje espacial.",
      function: "Consolida recuerdos y organiza informacion contextual.",
      facts: { Lobulo: "Temporal", Sistema: "Limbico", Glosario: "Hipocampo" }
    },
    {
      id: "ventriculo-lateral",
      name: "Ventriculo lateral",
      color: "#7fc1c5",
      x: 57,
      y: 46,
      description: "Cavidad ventricular que contiene liquido cefalorraquideo en cada hemisferio.",
      function: "Contribuye a circulacion y amortiguacion del liquido cefalorraquideo.",
      facts: { Contenido: "LCR", Relacion: "Profundo en hemisferios", Conexion: "Tercer ventriculo" }
    },
    {
      id: "tercer-ventriculo",
      name: "Tercer ventriculo",
      color: "#ffffff",
      x: 50,
      y: 43,
      description: "Cavidad media del sistema ventricular ubicada entre ambos talamos.",
      function: "Permite circulacion del liquido cefalorraquideo hacia acueducto cerebral.",
      facts: { Ubicacion: "Linea media", Paredes: "Talamos e hipotalamo", Contenido: "LCR" }
    },
    {
      id: "mesencefalo",
      name: "Mesencefalo",
      color: "#ff6f87",
      x: 57,
      y: 66,
      description: "Porcion superior del tronco encefalico relacionada con vias motoras y reflejos visuales y auditivos.",
      function: "Conecta centros superiores con puente, bulbo y medula.",
      facts: { Region: "Tronco encefalico", Relacion: "Inferior al diencefalo", Funcion: "Conduccion y reflejos" }
    }
  ],
  slices: Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    label: `Corte ${index + 1}`,
    level: index < 3 ? "Superior" : index < 6 ? "Ganglios basales" : "Inferior"
  }))
};
