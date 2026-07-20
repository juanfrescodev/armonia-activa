const DB_MUNDOS = {


    mundo1:{

        id:"mundo1",


        titulo:
        "El oído musical",


        descripcion:
        "Antes de aprender nombres y reglas, aprendé a escuchar las características fundamentales del sonido.",


        objetivo:
        "Desarrollar la percepción auditiva básica necesaria para comprender la música.",


        habilidades:[

            "Reconocer sonidos iguales y diferentes",

            "Distinguir sonidos graves y agudos",

            "Percibir movimientos melódicos"

        ],


        misiones:[

            {
            id:"m1",

            titulo:"¿Son iguales?",

            descripcion:
            "El primer paso para entrenar el oído es reconocer cuándo dos sonidos son iguales.",

            pasos:[

            {
            tipo:"teoria",

            titulo:"Escuchar antes de nombrar",

            contenido:
            "La música está formada por sonidos organizados.\n\nAntes de aprender nombres de notas o reglas, necesitamos entrenar una habilidad más básica: escuchar diferencias.\n\nTu oído puede comparar sonidos aunque todavía no sepas cómo se llaman."
            },

            {
            tipo:"comparacion",

            pregunta:
            "¿Escuchaste el mismo sonido?",

            ejemplos:[

            {
            nombre:"A",
            notas:["C4"]
            },

            {
            nombre:"B",
            notas:["C4"]
            }

            ],

            opciones:[
            "Sí",
            "No"
            ],

            correcta:0

            }

            ]

            },


            {
            id:"m2",

            titulo:"¿Cuál está más alto?",

            descripcion:
            "Descubrí que los sonidos pueden tener diferentes alturas.",

            pasos:[

            {
            tipo:"teoria",

            titulo:"La altura del sonido",

            contenido:
            "Los sonidos pueden sentirse más altos o más bajos.\n\nUn sonido agudo parece estar arriba y un sonido grave parece estar abajo.\n\nPor ahora no necesitamos saber sus nombres. Primero entrenamos el oído."
            },


            {
            tipo:"comparacion",

            pregunta:
            "¿Cuál sonido es más agudo?",

            ejemplos:[

            {
            nombre:"A",
            notas:["C4"]
            },

            {
            nombre:"B",
            notas:["G4"]
            }

            ],

            opciones:[
            "A",
            "B"
            ],

            correcta:1

            }

            ]

            },


            {
            id:"m3",

            titulo:"¿Cuál está más grave?",

            descripcion:
            "Entrená la percepción de sonidos bajos.",

            pasos:[

            {
            tipo:"comparacion",

            pregunta:
            "¿Cuál sonido es más grave?",

            ejemplos:[

            {
            nombre:"A",
            notas:["C5"]
            },

            {
            nombre:"B",
            notas:["C4"]
            }

            ],

            opciones:[
            "A",
            "B"
            ],

            correcta:1

            },

            {
            tipo:"teoria",

            titulo:"El registro",

            contenido:
            "Un mismo tipo de sonido puede aparecer más arriba o más abajo.\n\nLos sonidos altos pertenecen a un registro agudo.\n\nLos sonidos bajos pertenecen a un registro grave."
            }

            ]

            },


            {
            id:"m4",

            titulo:"La melodía se mueve",

            descripcion:
            "Descubrí que una melodía tiene un recorrido.",

            pasos:[

            {
            tipo:"teoria",

            titulo:"¿Qué es una melodía?",

            contenido:
            "Cuando varios sonidos aparecen uno después de otro forman una melodía.\n\nUna melodía no es solamente una lista de sonidos: es un recorrido que nuestro oído puede seguir."
            },

            {
            tipo:"teoria",

            titulo:"Dirección musical",

            contenido:
            "Una melodía puede subir hacia sonidos más agudos, bajar hacia sonidos más graves o cambiar de dirección.\n\nLos músicos entrenan su oído para reconocer estos movimientos."
            },

            {
            tipo:"comparacion",

            pregunta:
            "¿Cuál melodía sube?",

            ejemplos:[

            {
            nombre:"A",
            melodia:[
            "C4",
            "D4",
            "E4"
            ]
            },

            {
            nombre:"B",
            melodia:[
            "E4",
            "D4",
            "C4"
            ]
            }

            ],

            opciones:[
            "A",
            "B"
            ],

            correcta:0

            }

            ]

            },


            {
            id:"m5",

            titulo:"Cerca o lejos",

            descripcion:
            "Descubrí que no todos los movimientos entre sonidos tienen la misma distancia.",

            pasos:[

            {
            tipo:"teoria",

            titulo:"La distancia entre sonidos",

            contenido:
            "Cuando un sonido cambia de altura, nuestro oído percibe cuánto se alejó del sonido anterior.\n\nAlgunos movimientos son pequeños y otros grandes.\n\nMás adelante aprenderemos que estas distancias tienen un nombre."
            },

            {
            tipo:"comparacion",

            pregunta:
            "¿Cuál salto es mayor?",

            ejemplos:[

            {
            nombre:"A",
            melodia:[
            "C4",
            "D4"
            ]
            },

            {
            nombre:"B",
            melodia:[
            "C4",
            "G4"
            ]
            }

            ],

            opciones:[
            "A",
            "B"
            ],

            correcta:1

            }

            ]

            },

            {
                id:"m6",

                titulo:"La distancia mínima",

                descripcion:"Descubrí el movimiento más pequeño entre dos sonidos.",

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"El paso más pequeño",

                        contenido:
                        "Entre dos sonidos puede existir una distancia muy pequeña o muy grande.\n\nCuando dos notas están separadas por el movimiento más pequeño posible dentro del sistema musical, hablamos de un semitono.\n\nTodavía no necesitamos memorizar nombres. Primero aprendé a reconocerlo con el oído.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "C#4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál movimiento es más pequeño?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "C#4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "E4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    }

                ]

            },


            {
                id:"m7",

                titulo:"La misma nota, otra altura",

                descripcion:"Descubrí que una misma nota puede aparecer más arriba o más abajo.",

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"La altura y las notas",

                        contenido:
                        "Una nota puede aparecer en diferentes alturas.\n\nPor ejemplo, un C4 y un C5 tienen el mismo nombre, pero C5 suena más agudo.\n\nLa distancia entre esas dos versiones de la misma nota se llama octava.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "C5"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál ejemplo tiene la misma nota en otra altura?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "D4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "C5"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:1
                    }

                ]

            },


            {
                id:"m8",

                titulo:"Cerca o lejos",

                descripcion:"Aprendé a comparar distancias entre sonidos.",

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Los intervalos",

                        contenido:
                        "La distancia entre dos notas recibe el nombre de intervalo.\n\nUn intervalo puede ser pequeño, como un movimiento entre notas vecinas, o grande, como un salto hacia una nota alejada.\n\nLos músicos reconocen estas distancias porque cada una genera una sensación diferente.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "G4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál tiene sonidos más alejados?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "D4",
                                    "E4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "D4",
                                    "A4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:1
                    }

                ]

            },


            {
                id:"m9",

                titulo:"Melodías con dirección",

                descripcion:"Una melodía puede tener diferentes recorridos.",

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"El camino de una melodía",

                        contenido:
                        "Una melodía no es solamente una lista de notas.\n\nEs un recorrido donde cada sonido se relaciona con el anterior.\n\nEse recorrido puede subir, bajar o cambiar de dirección.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "D4",
                                "E4",
                                "D4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál melodía cambia de dirección?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "E4",
                                    "D4",
                                    "F4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:1
                    }

                ]

            },


            {
                id:"m10",

                titulo:"Reconocer patrones",

                descripcion:"Descubrí cómo la música utiliza repeticiones.",

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Los patrones musicales",

                        contenido:
                        "Nuestro cerebro busca relaciones y repeticiones.\n\nMuchas melodías utilizan pequeñas ideas que vuelven a aparecer.\n\nEstas repeticiones ayudan a que una frase musical sea fácil de recordar.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "D4",
                                "E4",
                                "C4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál frase termina igual que empieza?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "C4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    }

                ]

            },

            {
                id:"m11",

                titulo:"¿Cuál cambió?",

                descripcion:"Descubrí pequeñas variaciones dentro de una melodía.",

                xp:60,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Repetición y cambio",

                        contenido:
                        "Muchas veces una melodía vuelve a aparecer con pequeñas modificaciones.\n\nLos compositores pueden cambiar una nota, un ritmo o una dirección para crear una nueva versión de una misma idea.\n\nEscuchar estos cambios es una habilidad fundamental para analizar música.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "D4",
                                "E4",
                                "F4"
                            ]
                        }
                    },


                    {
                        tipo:"memoria",

                        modo:"comparacion",

                        pregunta:
                        "Escuchá la melodía original. ¿Cuál versión tiene una nota cambiada?",


                        referencia:{
                            melodia:[
                                "C4",
                                "D4",
                                "E4",
                                "F4"
                            ]
                        },


                        opciones:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "G4",
                                    "F4"
                                ]
                            }

                        ],

                        correcta:1
                    }

                ]

            },


            {
                id:"m12",

                titulo:"El intruso",

                descripcion:"Encontrá un sonido que rompe el patrón.",

                xp:60,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Expectativa musical",

                        contenido:
                        "Cuando escuchamos una repetición, nuestro cerebro crea una expectativa.\n\nSi aparece un sonido diferente, sentimos que algo cambió.\n\nLos compositores usan esto constantemente para crear sorpresa.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "C4",
                                "C4",
                                "D4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿En cuál aparece una nota diferente?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "C4",
                                    "C4",
                                    "D4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "E4",
                                    "E4",
                                    "E4",
                                    "E4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    }

                ]

            },


            {
                id:"m13",

                titulo:"El tamaño de una frase",

                descripcion:"La música también se organiza en grupos.",

                xp:60,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Frases musicales",

                        contenido:
                        "Una melodía puede dividirse en pequeñas partes llamadas frases.\n\nUna frase musical es una idea completa que tiene un comienzo y un final.\n\nMás adelante veremos que las frases se pueden comparar con las oraciones del lenguaje.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "D4",
                                "E4",
                                "G4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Qué ejemplo tiene una frase más larga?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "D4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:1
                    }

                ]

            },


            {
                id:"m14",

                titulo:"El motivo musical",

                descripcion:"Descubrí la pequeña idea detrás de una melodía.",

                xp:70,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Motivos",

                        contenido:
                        "Un motivo es una pequeña idea musical que puede repetirse o transformarse.\n\nMuchas canciones famosas están construidas a partir de motivos simples que el oído reconoce fácilmente.\n\nAprender a escuchar motivos es el primer paso para analizar y crear música.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "E4",
                                "G4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál motivo termina más arriba?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "G4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:1
                    }

                ]

            },


            {
                id:"m15",

                titulo:"Memoria musical",

                descripcion:"Escuchá una idea y reconocela entre varias opciones.",

                xp:80,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Recordar música",

                        contenido:
                        "La memoria musical funciona recordando relaciones entre sonidos.\n\nPodemos recordar una melodía porque reconocemos su recorrido, sus distancias y sus patrones.\n\nEsta capacidad será fundamental cuando aprendamos escalas e intervalos.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "E4",
                                "G4"
                            ]
                        }
                    },


                    {
                        tipo:"memoria",

                        modo:"practica",

                        pregunta:
                        "¿Cuál melodía es exactamente igual a esta melodía?",

                        referencia:{
                            melodia:[
                                "C4",
                                "E4",
                                "G4"
                            ]
                        },


                        opciones:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "F4",
                                    "G4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "E4",
                                    "G4"
                                ]
                            },

                            {
                                nombre:"C",

                                melodia:[
                                    "C4",
                                    "E4",
                                    "A4"
                                ]
                            }

                        ],

                        correcta:1
                    }

                ]

            },
            {
                id:"m16",

                titulo:"El comienzo de una melodía",

                descripcion:"Aprendé a reconocer la primera impresión de un sonido.",

                xp:70,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"La primera nota importa",

                        contenido:
                        "Muchas veces nuestra percepción de una melodía empieza con su primer sonido.\n\nUna melodía puede comenzar en una zona grave o aguda y eso cambia completamente su carácter.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "E4",
                                "G4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Qué melodía comienza más grave?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "E4",
                                    "G4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "G4",
                                    "A4",
                                    "B4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    }

                ]

            },


            {
                id:"m17",

                titulo:"El final de una melodía",

                descripcion:"Ahora concentrá tu atención en la última nota.",

                xp:70,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"El punto de llegada",

                        contenido:
                        "El final de una melodía también genera una sensación importante.\n\nUna melodía puede terminar en una nota alta, baja o volver al lugar donde empezó.",

                        ejemplo:{
                            melodia:[
                                "G4",
                                "E4",
                                "C4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál melodía termina más grave?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "G4",
                                    "E4",
                                    "C4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    }

                ]

            },


            {
                id:"m18",

                titulo:"Caminar o saltar",

                descripcion:"No todos los movimientos entre notas son iguales.",

                xp:80,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Pasos y saltos",

                        contenido:
                        "Una melodía puede avanzar nota por nota o realizar grandes saltos.\n\nLos movimientos pequeños suelen sentirse como un camino continuo.\n\nLos saltos producen cambios más grandes en la sensación musical.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "D4",
                                "E4",
                                "F4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál avanza siempre por notas cercanas?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "G4",
                                    "D4",
                                    "A4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    }

                ]

            },


            {
                id:"m19",

                titulo:"Grandes recorridos",

                descripcion:"Escuchá melodías con movimientos amplios.",

                xp:80,

                pasos:[

                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál tiene los saltos más grandes?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "G4",
                                    "D4",
                                    "A4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    }

                ]

            },


            {
                id:"m20",

                titulo:"La repetición",

                descripcion:"Reconocé cuándo una melodía vuelve sobre sí misma.",

                xp:90,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Repetición musical",

                        contenido:
                        "La repetición es uno de los recursos más importantes de la música.\n\nRepetir una nota o una idea ayuda a que una melodía sea reconocible y fácil de recordar.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "D4",
                                "D4",
                                "E4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál melodía repite una nota?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "D4",
                                    "E4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    }

                ]

            },

            {
                id:"m21",

                titulo:"¿Cuánto se mueve?",

                descripcion:"Compará el recorrido completo de una melodía.",

                xp:90,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Movimiento melódico",

                        contenido:
                        "Cuando escuchamos una melodía no solamente importa dónde empieza y dónde termina.\n\nTambién importa cuánto se mueve durante todo su recorrido.\n\nUna melodía puede mantenerse cerca o recorrer grandes distancias.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "G4",
                                "E4",
                                "A4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál cambia más de altura?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "C4",
                                    "D4",
                                    "D4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "G4",
                                    "E4",
                                    "A4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:1
                    }

                ]

            },


            {
                id:"m22",

                titulo:"Memoria auditiva II",

                descripcion:"Ahora las diferencias son más pequeñas.",

                xp:100,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Escuchar detalles",

                        contenido:
                        "A medida que entrenamos el oído podemos detectar diferencias cada vez más pequeñas.\n\nLos músicos desarrollan esta habilidad escuchando relaciones entre sonidos, no solamente notas individuales.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "E4",
                                "G4",
                                "F4"
                            ]
                        }
                    },


                    {
                        tipo:"memoria",

                        modo:"practica",

                        pregunta:
                        "¿Cuál melodía es exactamente igual a esta melodía?",

                        referencia:{
                            melodia:[
                                "C4",
                                "E4",
                                "G4",
                                "F4"
                            ]
                        },


                        opciones:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "E4",
                                    "G4",
                                    "F#4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "E4",
                                    "F4",
                                    "F4"
                                ]
                            },

                            {
                                nombre:"C",

                                melodia:[
                                    "C4",
                                    "E4",
                                    "G4",
                                    "F4"
                                ]
                            }

                        ],

                        correcta:2
                    }

                ]

            },


            {
                id:"m23",

                titulo:"El recorrido completo",

                descripcion:"Escuchá la forma de una melodía.",

                xp:100,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"La forma de una melodía",

                        contenido:
                        "Una melodía tiene una forma determinada por su recorrido.\n\nPuede subir hasta un punto importante y después descender.\n\nTambién puede moverse sin una dirección clara.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "E4",
                                "G4",
                                "E4",
                                "C4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál sube y después baja?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "E4",
                                    "G4",
                                    "E4",
                                    "C4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4",
                                    "G4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    }

                ]

            },


            {
                id:"m24",

                titulo:"Dirección continua",

                descripcion:"Reconocé recorridos claros.",

                xp:110,

                pasos:[

                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál melodía baja continuamente?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "G4",
                                    "F4",
                                    "E4",
                                    "D4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    }

                ]

            },


            {
                id:"m25",

                titulo:"Mini examen",

                descripcion:"Combinemos todo lo aprendido.",

                xp:150,

                pasos:[

                    {
                        tipo:"texto",

                        texto:
                        "Llegaste al último entrenamiento antes del desafío final. Escuchá con atención y usá todo lo aprendido."
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál tiene el salto más grande?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "G4",
                                    "A4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál termina más aguda?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "G4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:1
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál repite una nota?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "D4",
                                    "E4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    }

                ]

            },

            {
                id:"m26",

                titulo:"Detective musical",

                descripcion:"Escuchá una melodía y descubrí qué cambió.",

                xp:120,

                pasos:[

                    {
                        tipo:"texto",

                        texto:"Escuchá atentamente la melodía original. Después tendrás que encontrar qué opción tiene una modificación."
                    },

                    {
                        tipo:"memoria",

                        pregunta:"¿Cuál opción es exactamente igual a la melodía original?",

                        referencia:{
                            melodia:[
                                "C4",
                                "D4",
                                "E4",
                                "F4",
                                "G4"
                            ]
                        },

                        opciones:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4",
                                    "G4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "Eb4",
                                    "F4",
                                    "G4"
                                ]
                            },

                            {
                                nombre:"C",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "F4",
                                    "F4",
                                    "G4"
                                ]
                            }

                        ],

                        correcta:0
                    }

                ]

            },


            {
                id:"m27",

                titulo:"El camino de la melodía",

                descripcion:"Escuchá el recorrido completo.",

                xp:130,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Pensar en recorridos",

                        contenido:
                        "Una melodía puede imaginarse como un camino.\n\nPuede subir, bajar, detenerse, saltar o cambiar de dirección.\n\nLos músicos entrenan el oído para reconocer ese recorrido completo.",

                        ejemplo:{
                            melodia:[
                                "C4",
                                "G4",
                                "E4",
                                "A4"
                            ]
                        }
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál sube, baja y vuelve a subir?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "G4",
                                    "E4",
                                    "A4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    }

                ]

            },


            {
                id:"m28",

                titulo:"Oído fino",

                descripcion:"Detectá diferencias cada vez más pequeñas.",

                xp:140,

                pasos:[

                    {
                        tipo:"texto",

                        texto:
                        "Los músicos avanzados pueden notar diferencias muy pequeñas entre sonidos. Tu oído ya está preparado para buscar detalles."
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál termina una nota más alta?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "E4",
                                    "G4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "E4",
                                    "A4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:1
                    }

                ]

            },


            {
                id:"m29",

                titulo:"Preparación final",

                descripcion:"Último entrenamiento antes del desafío.",

                xp:150,

                pasos:[

                    {
                        tipo:"teoria",

                        titulo:"Todo lo que aprendiste",

                        contenido:
                        "Durante este mundo entrenaste habilidades fundamentales del oído musical:\n\nReconociste alturas graves y agudas.\n\nAprendiste a seguir movimientos melódicos.\n\nComparaste distancias entre sonidos.\n\nDetectaste repeticiones y cambios.\n\nEntrenaste tu memoria musical.\n\nAhora vas a combinar todo en el desafío final."
                    },


                    {
                        tipo:"comparacion",

                        pregunta:
                        "¿Cuál tiene más movimiento?",

                        ejemplos:[

                            {
                                nombre:"A",

                                melodia:[
                                    "C4",
                                    "G4",
                                    "D4",
                                    "A4",
                                    "E4"
                                ]
                            },

                            {
                                nombre:"B",

                                melodia:[
                                    "C4",
                                    "C4",
                                    "D4",
                                    "D4",
                                    "E4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    },


                    {
                        tipo:"texto",

                        texto:
                        "Excelente. Llegaste al desafío final del Mundo 1. Confía en tu oído."
                    }

                ]

            },

            {
                id:"boss1",

                titulo:"👑 Guardián del Oído",

                descripcion:"Demostrá todo lo que aprendiste en el Mundo 1.",

                xp:500,

                pasos:[

                    {
                        tipo:"texto",

                        texto:"Llegaste al desafío final. Todo lo que escuchaste durante este mundo fue un entrenamiento. A partir de ahora no habrá ayudas. Confiá en tu oído."
                    },


                    {
                        tipo:"comparacion",

                        pregunta:"¿Cuál melodía sube continuamente?",

                        ejemplos:[

                            {
                                nombre:"A",
                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            },

                            {
                                nombre:"B",
                                melodia:[
                                    "G4",
                                    "F4",
                                    "E4",
                                    "D4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    },


                    {
                        tipo:"comparacion",

                        pregunta:"¿Cuál termina más grave?",

                        ejemplos:[

                            {
                                nombre:"A",
                                melodia:[
                                    "G4",
                                    "E4",
                                    "C4"
                                ]
                            },

                            {
                                nombre:"B",
                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    },


                    {
                        tipo:"comparacion",

                        pregunta:"¿Cuál tiene el salto más grande?",

                        ejemplos:[

                            {
                                nombre:"A",
                                melodia:[
                                    "C4",
                                    "G4",
                                    "C5"
                                ]
                            },

                            {
                                nombre:"B",
                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    },


                    {
                        tipo:"comparacion",

                        pregunta:"¿Cuál melodía repite una nota?",

                        ejemplos:[

                            {
                                nombre:"A",
                                melodia:[
                                    "C4",
                                    "D4",
                                    "D4",
                                    "E4"
                                ]
                            },

                            {
                                nombre:"B",
                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    },


                    {
                        tipo:"memoria",

                        modo:"examen",

                        pregunta:"Escuchá atentamente esta melodía. Solo podrás escucharla una vez. ¿Cuál opción es exactamente igual?",

                        referencia:{
                            melodia:[
                                "C4",
                                "E4",
                                "G4",
                                "F4"
                            ]
                        },

                        opciones:[

                            {
                                nombre:"A",
                                melodia:[
                                    "C4",
                                    "E4",
                                    "F4",
                                    "F4"
                                ]
                            },

                            {
                                nombre:"B",
                                melodia:[
                                    "C4",
                                    "E4",
                                    "G4",
                                    "F4"
                                ]
                            },

                            {
                                nombre:"C",
                                melodia:[
                                    "C4",
                                    "F4",
                                    "G4",
                                    "F4"
                                ]
                            }

                        ],

                        correcta:1

                    },


                    {
                        tipo:"comparacion",

                        pregunta:"¿Cuál empieza más aguda?",

                        ejemplos:[

                            {
                                nombre:"A",
                                melodia:[
                                    "G4",
                                    "F4",
                                    "E4"
                                ]
                            },

                            {
                                nombre:"B",
                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    },


                    {
                        tipo:"comparacion",

                        pregunta:"¿Cuál tiene más movimiento?",

                        ejemplos:[

                            {
                                nombre:"A",
                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            },

                            {
                                nombre:"B",
                                melodia:[
                                    "C4",
                                    "C4",
                                    "D4",
                                    "D4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    },


                    {
                        tipo:"comparacion",

                        pregunta:"¿Cuál baja continuamente?",

                        ejemplos:[

                            {
                                nombre:"A",
                                melodia:[
                                    "G4",
                                    "F4",
                                    "E4",
                                    "D4"
                                ]
                            },

                            {
                                nombre:"B",
                                melodia:[
                                    "C4",
                                    "E4",
                                    "G4",
                                    "A4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    },


                    {
                        tipo:"memoria",

                        modo:"examen",

                        pregunta:"Escuchá la melodía original. ¿Cuál opción es exactamente igual?",

                        referencia:{
                            melodia:[
                                "C4",
                                "D4",
                                "E4",
                                "F4"
                            ]
                        },

                        opciones:[

                            {
                                nombre:"A",
                                melodia:[
                                    "C4",
                                    "D4",
                                    "E4",
                                    "F4"
                                ]
                            },

                            {
                                nombre:"B",
                                melodia:[
                                    "C4",
                                    "D4",
                                    "Eb4",
                                    "F4"
                                ]
                            },

                            {
                                nombre:"C",
                                melodia:[
                                    "C4",
                                    "D4",
                                    "G4",
                                    "F4"
                                ]
                            }

                        ],

                        correcta:0

                    },


                    {
                        tipo:"comparacion",

                        pregunta:"¿Cuál tiene más movimiento?",

                        ejemplos:[

                            {
                                nombre:"A",
                                melodia:[
                                    "C4",
                                    "G4",
                                    "D4",
                                    "A4"
                                ]
                            },

                            {
                                nombre:"B",
                                melodia:[
                                    "C4",
                                    "C4",
                                    "D4",
                                    "D4"
                                ]
                            }

                        ],

                        opciones:[
                            "A",
                            "B"
                        ],

                        correcta:0
                    },


                    {
                        tipo:"texto",

                        texto:"Excelente. Tu oído ya puede distinguir alturas, direcciones, saltos, distancias y patrones. Ya estás preparado para empezar a ponerle nombre a todo eso."
                    }

                ]

            }
        ]
        },


    mundo2:{

        id:"mundo2",


        titulo:
        "El lenguaje musical",


        descripcion:
        "Convertí lo que escuchás en conceptos musicales: notas, intervalos y escalas.",


        objetivo:
        "Comprender cómo se organiza el sonido dentro del sistema musical.",


        habilidades:[

            "Notas musicales",

            "Intervalos",

            "Escalas"

        ],


        misiones:[]


    },


    mundo3:{

        id:"mundo3",

        titulo:
        "La arquitectura de las escalas",

        descripcion:
        "Descubrí cómo se construyen las escalas y cómo cada una genera un universo sonoro diferente.",

        objetivo:
        "Comprender la organización interna de las escalas musicales y sus diferentes colores.",

        habilidades:[

            "Construir escalas mayores y menores",

            "Comprender modos musicales",

            "Reconocer diferentes sonoridades"

        ],

        misiones:[]

    },


    mundo4:{

        id:"mundo4",

        titulo:
        "El lenguaje de los acordes",

        descripcion:
        "Aprendé cómo las notas se combinan para crear acordes y colores armónicos.",

        objetivo:
        "Comprender la construcción y funcionamiento de los acordes.",

        habilidades:[

            "Construir tríadas",

            "Reconocer tipos de acordes",

            "Comprender inversiones y extensiones"

        ],

        misiones:[]

    },


    mundo5:{

        id:"mundo5",

        titulo:
        "La gravedad musical",

        descripcion:
        "Descubrí por qué algunos acordes generan tensión y otros sensación de descanso.",

        objetivo:
        "Comprender la tonalidad y las funciones armónicas.",

        habilidades:[

            "Identificar tónica, dominante y subdominante",

            "Analizar progresiones",

            "Comprender cadencias"

        ],

        misiones:[]

    },


    mundo6:{

        id:"mundo6",

        titulo:
        "Expandir la armonía",

        descripcion:
        "Explorá los recursos que utilizan los compositores para crear sorpresa y movimiento.",

        objetivo:
        "Comprender herramientas armónicas avanzadas.",

        habilidades:[

            "Reconocer dominantes secundarias",

            "Comprender intercambio modal",

            "Analizar modulaciones"

        ],

        misiones:[]

    },


    mundo7:{

        id:"mundo7",

        titulo:
        "El pensamiento del compositor",

        descripcion:
        "Transformá los conocimientos musicales en herramientas para crear tus propias ideas.",

        objetivo:
        "Aprender a desarrollar melodías, armonías y estructuras musicales.",

        habilidades:[

            "Crear motivos musicales",

            "Desarrollar frases",

            "Armonizar melodías"

        ],

        misiones:[]

    },


    mundo8:{

        id:"mundo8",

        titulo:
        "Análisis musical avanzado",

        descripcion:
        "Aprendé a escuchar canciones y obras entendiendo las decisiones detrás de cada elemento.",

        objetivo:
        "Analizar música desde una perspectiva completa.",

        habilidades:[

            "Analizar armonía",

            "Comprender formas musicales",

            "Reconocer estilos y recursos"

        ],

        misiones:[]

    },


    mundo9:{

        id:"mundo9",

        titulo:
        "Entrenamiento profesional del oído",

        descripcion:
        "Desarrollá una percepción auditiva capaz de reconocer relaciones musicales complejas.",

        objetivo:
        "Entrenar el oído musical a un nivel avanzado.",

        habilidades:[

            "Reconocer intervalos",

            "Identificar acordes",

            "Escuchar funciones armónicas"

        ],

        misiones:[]

    },


    mundo10:{

        id:"mundo10",

        titulo:
        "Maestría musical",

        descripcion:
        "Integrá todo lo aprendido para pensar, crear y analizar música con autonomía.",

        objetivo:
        "Alcanzar una comprensión profunda del lenguaje musical.",

        habilidades:[

            "Componer",

            "Arreglar",

            "Analizar música profesionalmente"

        ],

        misiones:[]

    }

}