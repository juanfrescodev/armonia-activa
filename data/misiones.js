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
    "Descubrí cómo los sonidos se convierten en notas, melodías y música.",


    objetivo:
    "Dominar las bases del lenguaje musical: reconocer notas, alturas, movimientos melódicos y lectura musical básica.",


    habilidades:[

        "Reconocimiento de notas",

        "Altura del sonido",

        "Melodías",

        "Lectura musical",

        "Lenguaje musical"

     

    ],



    misiones:[



// ======================================================
// MISION 1
// ======================================================


{
    id:"descubriendo_do",

    titulo:"Descubriendo DO",

    descripcion:
    "La primera pieza del lenguaje musical.",



    pasos:[


        {

            tipo:"nota_explicacion",

            nota:"C4",

            nombre:"DO",

            texto:
            "Todo lenguaje necesita un punto de partida. En música comenzaremos con DO. Escuchá su sonido, observá dónde aparece y aprendé a reconocerlo."

        },


        {

            tipo:"piano_interactivo",

            pregunta:
            "Encontrá la nota DO en el piano.",

            correcta:
            "C"

        },


        {

            tipo:"pentagrama_interactivo",

            pregunta:
            "Encontrá DO en el pentagrama.",

            correcta:
            "C4"

        },


        {

            tipo:"nota_explicacion",

            nota:"C4",

            nombre:"DO",

            texto:
            "Perfecto. Ahora sabés que un sonido puede tener un nombre, una posición en un instrumento y una escritura musical."

        }


    ]

},




// ======================================================
// MISION 2
// ======================================================


{

    id:"primer_movimiento",

    titulo:
    "El primer movimiento",


    descripcion:
    "Descubrí que las notas pueden moverse hacia arriba y hacia abajo.",



    pasos:[



        {

            tipo:"nota_explicacion",

            nota:"D4",

            nombre:"RE",

            texto:
            "Aparece una nueva nota. RE está más arriba que DO. La diferencia entre sonidos puede sentirse como un movimiento."

        },



        {

            tipo:"comparacion",

            pregunta:
            "Escuchá estas notas. ¿Cuál suena más aguda?",


            ejemplos:[


                {
                    nombre:"DO",

                    notas:[
                        "C4"
                    ]
                },


                {
                    nombre:"RE",

                    notas:[
                        "D4"
                    ]
                }


            ],


            opciones:[

                "DO",

                "RE"

            ],


            correcta:1


        },



        {

            tipo:"comparacion",

            pregunta:
            "Escuchá la melodía. ¿Qué movimiento hace?",


            ejemplos:[


                {

                    nombre:"Melodía",

                    melodia:[

                        "C4",
                        "D4"

                    ]

                }


            ],


            opciones:[

                "Sube",

                "Baja"

            ],


            correcta:0

        },



        {

            tipo:"piano_interactivo",

            pregunta:
            "Encontrá RE en el piano.",

            correcta:
            "D"

        },


        {

            tipo:"pentagrama_interactivo",

            pregunta:
            "Encontrá RE en el pentagrama.",

            correcta:
            "D4"

        }



    ]

},




// ======================================================
// MISION 3
// ======================================================


{

    id:"tres_notas_crean_musica",

    titulo:
    "Tres notas crean música",


    descripcion:
    "Con solo tres sonidos ya podemos construir pequeñas melodías.",



    pasos:[



        {

            tipo:"nota_explicacion",

            nota:"E4",

            nombre:"MI",

            texto:
            "MI es la tercera nota que aprendemos. Ahora tenemos DO, RE y MI: tres sonidos capaces de crear pequeñas ideas musicales."

        },



        {

            tipo:"comparacion",

            pregunta:
            "Escuchá esta melodía. ¿Qué dirección tiene?",


            ejemplos:[


                {

                    nombre:"Melodía",

                    melodia:[

                        "C4",
                        "D4",
                        "E4"

                    ]

                }


            ],


            opciones:[

                "Sube",

                "Baja"

            ],


            correcta:0


        },



        {

            tipo:"comparacion",

            pregunta:
            "¿Cuál nota está más arriba?",


            ejemplos:[


                {

                    nombre:"MI",

                    notas:[
                        "E4"
                    ]

                },


                {

                    nombre:"DO",

                    notas:[
                        "C4"
                    ]

                }


            ],


            opciones:[

                "MI",

                "DO"

            ],


            correcta:0


        },



        {

            tipo:"piano_interactivo",

            pregunta:
            "Encontrá MI en el piano.",

            correcta:
            "E"

        },



        {

            tipo:"pentagrama_interactivo",

            pregunta:
            "Encontrá MI en el pentagrama.",

            correcta:
            "E4"

        }



    ]

},

{

    id:"detras_1",

    titulo:"🎼 Detrás de la música",

    descripcion:
    "¿Hace falta tener un don para aprender música?",

    pasos:[

        {

            tipo:"detras_de_la_musica",

            titulo:"¿Y si me equivoco?",

            texto:[

                "Es normal que todavía confundas algunas notas. De hecho, eso es exactamente lo que esperamos.",

                "En este curso no estamos entrenando el oído absoluto. Estamos entrenando algo mucho más útil: aprender a comparar sonidos y descubrir sus diferencias.",

                "Cada vez que dudás o te equivocás, tu cerebro está construyendo nuevas referencias."

            ],

            frase:
            "Equivocarte también es aprender."

        }

    ],

    xp:25

},





// ======================================================
// MISION 4
// ======================================================


{

    id:"la_escalera_musical",

    titulo:
    "La escalera musical",


    descripcion:
    "Las notas empiezan a formar un camino.",



    pasos:[



        {

            tipo:"nota_explicacion",

            nota:"F4",

            nombre:"FA",

            texto:
            "FA continúa la escalera. Cada nota ocupa un lugar diferente dentro del orden musical."

        },



        {

            tipo:"nota_explicacion",

            nota:"G4",

            nombre:"SOL",

            texto:
            "SOL completa nuestro primer grupo de cinco notas. Muchas melodías utilizan SOL como un punto importante de llegada."

        },



        {

            tipo:"comparacion",

            pregunta:
            "Escuchá esta escala. ¿Qué sucede con las notas?",


            ejemplos:[


                {

                    nombre:"Escala",

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

                "Sube continuamente",

                "Baja continuamente"

            ],


            correcta:0


        },



        {

            tipo:"comparacion",

            pregunta:
            "¿Cuál nota está más lejos de DO?",


            ejemplos:[


                {

                    nombre:"RE",

                    notas:[
                        "D4"
                    ]

                },


                {

                    nombre:"SOL",

                    notas:[
                        "G4"
                    ]

                }


            ],


            opciones:[

                "RE",

                "SOL"

            ],


            correcta:1


        },



        {

            tipo:"piano_interactivo",

            pregunta:
            "Encontrá SOL en el piano.",

            correcta:
            "G"

        },


        {

            tipo:"pentagrama_interactivo",

            pregunta:
            "Encontrá SOL en el pentagrama.",

            correcta:
            "G4"

        },
        


    ]

    },

{

    id:"detras_2",

    titulo:"🎼 Detrás de la música",

    descripcion:
    "El oído absoluto no es obligatorio.",

    pasos:[

        {

            tipo:"detras_de_la_musica",

            titulo:"El mito del oído absoluto",

            texto:[

                "Muchas personas creen que todos los músicos escuchan una nota y saben inmediatamente si es un DO o un SOL.",

                "La realidad es muy distinta. Esa habilidad existe, pero es extremadamente poco frecuente.",

                "La enorme mayoría de los músicos profesionales nunca tuvo oído absoluto."

            ],

            frase:
            "Lo importante no es reconocer una nota aislada. Lo importante es comprender cómo se relaciona con las demás."

        }

    ],

    xp:25

},



    {
        id:"reconociendo_melodias",

        titulo:"¿Reconocés la melodía?",

        descripcion:
        "Ahora las notas empiezan a formar canciones.",

        pasos:[

            {
                tipo:"nota_explicacion",

                nota:"A4",

                nombre:"LA",

                texto:
                "Con LA ya tenemos seis notas distintas. A partir de ahora empezaremos a reconocer melodías completas."
            },

            {
                tipo:"comparacion",

                pregunta:
                "Escuchá la melodía. ¿Cuál opción coincide exactamente?",

                ejemplo:{

                    nombre:"Melodía",

                    melodia:[
                        "C4",
                        "D4",
                        "E4",
                        "G4",
                        "A4"
                    ]

                },

                opciones:[

                    "DO RE MI SOL LA",

                    "DO MI RE SOL LA"

                ],

                correcta:0

            },

            {
                tipo:"piano_interactivo",

                pregunta:"Encontrá LA en el piano.",

                correcta:"A"

            },

            {
                tipo:"pentagrama_interactivo",

                pregunta:"Encontrá LA en el pentagrama.",

                correcta:"A4"

            }

        ]

    },

    {
        id:"la_nota_que_falta",

        titulo:"La nota que falta",

        descripcion:
        "¿Podés completar una melodía?",

        pasos:[

            {
                tipo:"comparacion",

                pregunta:
                "Escuchá la melodía. ¿Qué nota falta al final?",

                ejemplo:{

                    nombre:"Melodía",

                    melodia:[
                        "C4",
                        "D4",
                        "E4",
                        "F4"
                    ]

                },

                opciones:[

                    "SOL",

                    "RE"

                ],

                correcta:0

            },

            {
                tipo:"comparacion",

                pregunta:
                "¿Qué dirección tiene la melodía?",

                ejemplo:{

                    nombre:"Melodía",

                    melodia:[
                        "A4",
                        "G4",
                        "F4",
                        "E4"
                    ]

                },

                opciones:[
                    "Sube",
                    "Baja"
                ],

                correcta:1

            }

        ]

    },

    {
        id:"llega_si",

        titulo:"La última pieza",

        descripcion:
        "Con SI completamos las siete notas musicales.",

        pasos:[

            {
                tipo:"nota_explicacion",

                nota:"B4",

                nombre:"SI",

                texto:
                "SI completa el conjunto de las siete notas musicales."
            },

            {
                tipo:"comparacion",

                pregunta:
                "¿Cuál es la nota más aguda?",

                ejemplos:[

                    {
                        nombre:"SOL",
                        notas:["G4"]
                    },

                    {
                        nombre:"SI",
                        notas:["B4"]
                    }

                ],

                opciones:[
                    "SOL",
                    "SI"
                ],

                correcta:1

            },

            {
                tipo:"piano_interactivo",

                pregunta:"Encontrá SI.",

                correcta:"B"

            },

            {
                tipo:"pentagrama_interactivo",

                pregunta:"Encontrá SI.",

                correcta:"B4"

            }

        ]

    },

{

    id:"detras_3",

    titulo:"🎼 Detrás de la música",

    descripcion:
    "Aprender música se parece mucho a aprender un idioma.",

    pasos:[

        {

            tipo:"detras_de_la_musica",

            titulo:"Todavía estamos aprendiendo las letras",

            texto:[

                "Cuando aprendiste a leer tampoco conocías todas las letras desde el primer día.",

                "Primero aprendiste sus formas. Después sus nombres. Mucho más adelante empezaste a formar palabras.",

                "Con la música ocurre exactamente lo mismo."

            ],

            frase:
            "Hoy aprendemos las letras. Las palabras llegarán muy pronto."

        }

    ],

    xp:25

},

{
    id:"detective_melodico",

    titulo:"Detective melódico",

    descripcion:"Ahora vas a investigar qué ocurre dentro de una melodía.",

    pasos:[

        {
            tipo:"comparacion",

            pregunta:"¿La melodía termina más arriba o más abajo de donde empezó?",

            ejemplo:{
                nombre:"Melodía",
                melodia:[
                    "C4",
                    "E4",
                    "D4",
                    "G4"
                ]
            },

            opciones:[
                "Más arriba",
                "Más abajo"
            ],

            correcta:0
        },

        {
            tipo:"comparacion",

            pregunta:"¿Cuál fue la nota más aguda?",

            ejemplo:{
                nombre:"Melodía",
                melodia:[
                    "C4",
                    "E4",
                    "D4",
                    "G4"
                ]
            },

            opciones:[
                "MI",
                "SOL"
            ],

            correcta:1
        },

        {
            tipo:"comparacion",

            pregunta:"¿Cuál fue la primera nota?",

            ejemplo:{
                nombre:"Melodía",
                melodia:[
                    "C4",
                    "E4",
                    "D4",
                    "G4"
                ]
            },

            opciones:[
                "DO",
                "MI"
            ],

            correcta:0
        }

    ]
},

{
    id:"escalera_completa",

    titulo:"La escalera completa",

    descripcion:"Ya conocés todas las notas. Escuchá cómo forman una escala.",

    pasos:[

        {
            tipo:"comparacion",

            pregunta:"¿Qué escuchaste?",

            ejemplo:{
                nombre:"Escala",
                melodia:[
                    "C4",
                    "D4",
                    "E4",
                    "F4",
                    "G4",
                    "A4",
                    "B4",
                    "C5"
                ]
            },

            opciones:[
                "Una escala",
                "Una melodía cualquiera"
            ],

            correcta:0
        },

        {
            tipo:"comparacion",

            pregunta:"¿La escala sube o baja?",

            ejemplo:{
                nombre:"Escala",
                melodia:[
                    "C4",
                    "D4",
                    "E4",
                    "F4",
                    "G4",
                    "A4",
                    "B4",
                    "C5"
                ]
            },

            opciones:[
                "Sube",
                "Baja"
            ],

            correcta:0
        },

        {
            tipo:"comparacion",

            pregunta:"¿Cuál es la última nota?",

            ejemplo:{
                nombre:"Escala",
                melodia:[
                    "C4",
                    "D4",
                    "E4",
                    "F4",
                    "G4",
                    "A4",
                    "B4",
                    "C5"
                ]
            },

            opciones:[
                "DO",
                "SI"
            ],

            correcta:0
        }

    ]
},

{
    id:"memoria_musical",

    titulo:"Memoria musical",

    descripcion:"Tu oído empieza a recordar patrones.",

    pasos:[

        {
            tipo:"comparacion",

            pregunta:"Escuchá la melodía. ¿Cuál opción es igual?",

            ejemplo:{
                nombre:"Original",
                melodia:[
                    "C4",
                    "D4",
                    "E4",
                    "D4"
                ]
            },

            opciones:[
                "DO RE MI RE",
                "DO MI RE MI"
            ],

            correcta:0
        },

        {
            tipo:"comparacion",

            pregunta:"¿Qué nota se repite?",

            ejemplo:{
                nombre:"Melodía",
                melodia:[
                    "C4",
                    "D4",
                    "E4",
                    "D4"
                ]
            },

            opciones:[
                "RE",
                "MI"
            ],

            correcta:0
        }

    ]
},

{

    id:"detras_4",

    titulo:"🎼 Detrás de la música",

    descripcion:
    "No hace falta tener un oído perfecto para hacer historia.",

    pasos:[

        {

            tipo:"detras_de_la_musica",

            titulo:"Paul McCartney",

            texto:[

                "Paul McCartney contó en distintas entrevistas que no tiene oído absoluto.",

                "Sin embargo escribió algunas de las canciones más famosas de la historia junto a The Beatles.",

                "Lo importante no era reconocer una nota cualquiera. Lo importante era escuchar cómo las notas funcionaban juntas."

            ],

            video:"https://www.youtube.com/embed/YvUokNsu2Dw",

            frase:
            "La música no depende de un don. Depende de entrenar el oído."

        }

    ],

    xp:25

},

{
    id:"melodias_famosas",

    titulo:"¿Te suena?",

    descripcion:"Algunas melodías son parte de nuestra memoria.",

    pasos:[

        {
            tipo:"comparacion",

            pregunta:"¿Qué melodía escuchaste?",

            ejemplo:{
                nombre:"Melodía",
                melodia:[
                    "C4",
                    "C4",
                    "G4",
                    "G4",
                    "A4",
                    "A4",
                    "G4"
                ]
            },

            opciones:[
                "Estrellita",
                "Escala"
            ],

            correcta:0
        }

    ]
},

{
    id:"el_impostor",

    titulo:"El impostor",

    descripcion:"Una de estas melodías cambió una sola nota.",

    pasos:[

        {
            tipo:"memoria",

            modo:"practica",

            pregunta:
            "Escuchá atentamente. ¿Cuál opción es exactamente igual?",

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

            correcta:0
        }

    ]

},

{
    id:"ascensor",

    titulo:"El ascensor musical",

    descripcion:"Seguí el movimiento de la melodía.",

    pasos:[

        {

            tipo:"comparacion",

            pregunta:"¿Qué hace esta melodía?",

            ejemplo:{
                nombre:"Melodía",

                melodia:[
                    "C4",
                    "E4",
                    "G4",
                    "E4",
                    "C4"
                ]

            },

            opciones:[

                "Sube y después baja",

                "Baja todo el tiempo"

            ],

            correcta:0

        },

        {

            tipo:"comparacion",

            pregunta:"¿En qué nota estuvo el punto más alto?",

            ejemplo:{
                nombre:"Melodía",

                melodia:[
                    "C4",
                    "E4",
                    "G4",
                    "E4",
                    "C4"
                ]

            },

            opciones:[

                "MI",

                "SOL"

            ],

            correcta:1

        }

    ]

},

{
    id:"traductor",

    titulo:"Traductor musical",

    descripcion:"Una misma nota puede verse de distintas maneras.",

    pasos:[

        {

            tipo:"nota_explicacion",

            nota:"A4",

            nombre:"LA",

            texto:"Una misma nota puede escucharse, escribirse en un pentagrama o tocarse en un piano. Tu cerebro ya empieza a traducir automáticamente entre esos tres lenguajes."

        },

        {

            tipo:"piano_interactivo",

            pregunta:"Encontrá LA.",

            correcta:"A"

        },

        {

            tipo:"pentagrama_interactivo",

            pregunta:"Ahora encontrá exactamente la misma nota en el pentagrama.",

            correcta:"A4"

        },

        {

            tipo:"comparacion",

            pregunta:"¿Qué nota acabás de tocar?",

            ejemplo:{
                nombre:"Nota",
                notas:["A4"]
            },

            opciones:[
                "SOL",
                "LA"
            ],

            correcta:1

        }

    ]

},

{
    id:"eco",

    titulo:"El eco",

    descripcion:"Escuchá con atención y encontrá la misma melodía.",

    pasos:[

        {
            tipo:"memoria",

            modo:"practica",

            pregunta:
            "Escuchá la melodía. ¿Cuál opción es exactamente igual?",

            referencia:{
                melodia:[
                    "E4",
                    "F4",
                    "G4",
                    "F4"
                ]
            },

            opciones:[

                {
                    nombre:"A",
                    melodia:[
                        "E4",
                        "F4",
                        "G4",
                        "F4"
                    ]
                },

                {
                    nombre:"B",
                    melodia:[
                        "E4",
                        "G4",
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
    id:"frases",

    titulo:"Las frases musicales",

    descripcion:"Descubrí que las melodías también cuentan historias.",

    xp:150,

    pasos:[

        {
            tipo:"texto",

            texto:"Una melodía no es solo una serie de notas. Igual que una frase hablada, tiene un comienzo, un camino y un final."
        },


        {
            tipo:"comparacion",

            pregunta:"¿Cuál melodía parece tener un final más claro?",

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
            tipo:"comparacion",

            pregunta:"¿Cuál parece una pregunta que necesita continuar?",

            ejemplos:[

                {
                    nombre:"A",
                    melodia:[
                        "C4",
                        "D4",
                        "E4",
                        "G4"
                    ]
                },

                {
                    nombre:"B",
                    melodia:[
                        "G4",
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
        },


        {
            tipo:"memoria",

            pregunta:"Escuchá esta frase musical. ¿Cuál opción es igual?",

            referencia:{
                melodia:[
                    "C4",
                    "E4",
                    "D4",
                    "G4"
                ]
            },

            opciones:[

                {
                    nombre:"A",
                    melodia:[
                        "C4",
                        "E4",
                        "D4",
                        "G4"
                    ]
                },

                {
                    nombre:"B",
                    melodia:[
                        "C4",
                        "D4",
                        "E4",
                        "G4"
                    ]
                },

                {
                    nombre:"C",
                    melodia:[
                        "C4",
                        "E4",
                        "G4",
                        "D4"
                    ]
                }

            ],

            correcta:0

        },


        {
            tipo:"texto",

            texto:"Ahora entendés algo fundamental: las notas son las letras, pero las melodías son las palabras. El lenguaje musical empieza a tomar forma."
        }

    ]

},

{

    id:"detras_5",

    titulo:"🎼 Detrás de la música",

    descripcion:
    "Antes del desafío final.",

    pasos:[

        {

            tipo:"detras_de_la_musica",

            titulo:"Mirá todo lo que avanzaste",

            texto:[

                "Cuando comenzaste este mundo, las notas eran solo nombres desconocidos.",

                "Hoy ya podés reconocerlas en el piano, encontrarlas en el pentagrama y relacionarlas con los sonidos que escuchás.",

                "Todavía no esperamos que identifiques cualquier nota de oído. Ese nunca fue el objetivo.",

                "Lo importante es que ahora entendés el lenguaje con el que se escribe toda la música."

            ],

            frase:
            "Respirá hondo. Ya tenés todo lo necesario para enfrentar al Guardián del Lenguaje Musical."

        }

    ],

    xp:25

},

{
    id:"boss2",

    titulo:"👑 Guardián del Lenguaje Musical",

    descripcion:
    "Demostrá que ya dominás el lenguaje de las notas.",


    xp:800,


    pasos:[


        {

            tipo:"texto",

            texto:
            "Llegaste al desafío final. Durante este mundo descubriste que los sonidos tienen nombres, que las notas ocupan lugares en el piano y que también pueden escribirse en el pentagrama. Ahora tendrás que usar todo junto. El Guardián mezclará todos los desafíos. No busques recordar ejercicios: entendé el lenguaje."

        },


        {

            tipo:"comparacion",

            pregunta:
            "Escuchá estas melodías. ¿Cuál sube continuamente?",


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

            tipo:"identificar_nota",

            modo:"pentagrama",

            pregunta:
            "Observá la nota escrita. ¿Qué nota es?",

            nota:"C4",

            opciones:[

                "DO",
                "RE",
                "MI",
                "SOL"

            ],

            correcta:0

        },



        {

            tipo:"memoria",

            modo:"examen",

            pregunta:
            "Escuchá atentamente. ¿Cuál melodía es exactamente igual?",


            referencia:{

                melodia:[

                    "C4",
                    "E4",
                    "D4",
                    "G4"

                ]

            },


            opciones:[

                {

                    nombre:"A",

                    melodia:[

                        "C4",
                        "E4",
                        "D4",
                        "G4"

                    ]

                },


                {

                    nombre:"B",

                    melodia:[

                        "C4",
                        "D4",
                        "E4",
                        "G4"

                    ]

                },


                {

                    nombre:"C",

                    melodia:[

                        "E4",
                        "D4",
                        "C4",
                        "G4"

                    ]

                }

            ],


            correcta:0

        },



        {

            tipo:"identificar_nota",

            modo:"piano",

            pregunta:
            "La tecla marcada tiene un sonido. ¿Qué nota es?",

            nota:"G4",

            opciones:[

                "FA",
                "SOL",
                "LA",
                "MI"

            ],

            correcta:1

        },



        {

            tipo:"comparacion",

            pregunta:
            "¿Cuál nota está más aguda?",


            ejemplos:[

                {

                    nombre:"A",

                    notas:[

                        "E4"

                    ]

                },


                {

                    nombre:"B",

                    notas:[

                        "A4"

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

            tipo:"pentagrama_interactivo",

            pregunta:
            "Encontrá la nota MI en el pentagrama.",

            correcta:"E4"

        },



        {

            tipo:"identificar_nota",

            modo:"pentagrama",

            pregunta:
            "Leé la nota escrita. ¿Cuál es?",

            nota:"G4",

            opciones:[

                "MI",
                "FA",
                "SOL",
                "LA"

            ],

            correcta:2

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

        },



        {

            tipo:"identificar_nota",

            modo:"piano",

            pregunta:
            "¿Qué nota está marcada en el piano?",

            nota:"B4",

            opciones:[

                "SOL",
                "LA",
                "SI",
                "DO"

            ],

            correcta:2

        },



        {

            tipo:"piano_interactivo",

            pregunta:
            "Encontrá SOL en el piano.",

            correcta:"G"

        },



        {

            tipo:"memoria",

            modo:"examen",

            pregunta:
            "Escuchá la melodía. Una sola nota cambió. ¿Cuál opción es exactamente igual a la original?",


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
                        "F4",
                        "F4"

                    ]

                },


                {

                    nombre:"C",

                    melodia:[

                        "C4",
                        "E4",
                        "E4",
                        "F4"

                    ]

                }

            ],


            correcta:0

        },



        {

            tipo:"identificar_nota",

            modo:"pentagrama",

            pregunta:
            "Último desafío de lectura. ¿Qué nota aparece?",

            nota:"A4",

            opciones:[

                "SOL",
                "LA",
                "SI",
                "MI"

            ],

            correcta:1

        },



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

        },



        {

            tipo:"memoria",

            modo:"examen",

            pregunta:
            "El último desafío. Escuchá la melodía completa y encontrá la correcta.",


            referencia:{

                melodia:[

                    "C4",
                    "E4",
                    "G4",
                    "E4",
                    "D4"

                ]

            },


            opciones:[


                {

                    nombre:"A",

                    melodia:[

                        "C4",
                        "E4",
                        "G4",
                        "E4",
                        "D4"

                    ]

                },


                {

                    nombre:"B",

                    melodia:[

                        "C4",
                        "D4",
                        "G4",
                        "E4",
                        "D4"

                    ]

                },


                {

                    nombre:"C",

                    melodia:[

                        "E4",
                        "G4",
                        "E4",
                        "D4",
                        "C4"

                    ]

                }

            ],


            correcta:0

        },



        {

            tipo:"texto",

            texto:
            "¡Excelente! Ya conocés las letras del lenguaje musical. Podés reconocer sonidos, identificar notas escritas, ubicarlas en el piano y relacionarlas con lo que escuchás. Ahora tenés las herramientas básicas para empezar a descubrir cómo las notas se organizan entre sí. En el próximo mundo aprenderás cómo esas letras forman escalas y nuevas relaciones musicales."

        }


    ]

}



    ]

    },

    mundo3:{

        id:"mundo3",

        titulo:
        "La distancia entre sonidos",

        descripcion:
        "Descubrí cómo las notas se relacionan entre sí y cómo la distancia entre ellas crea nuevas posibilidades musicales.",

        objetivo:
        "Comprender y reconocer intervalos musicales mediante el oído, la vista y la construcción.",

        habilidades:[

            "Reconocer distancias entre notas",

            "Comprender tonos y semitonos",

            "Identificar intervalos musicales"

        ],

        misiones:[


{
id:"m3m1",

titulo:
"Cerca o lejos",

descripcion:
"Descubrí que algunas notas están más cerca que otras.",

xp:50,

pasos:[

{
tipo:"detras_de_la_musica",

titulo:
"Los sonidos también tienen distancia",

texto:[

"Cuando una nota cambia hacia otra, no siempre recorre el mismo camino.",

"A veces el cambio es pequeño. Otras veces parece un gran salto.",

"Hoy no vas a estudiar teoría. Solo vas a escuchar."

],

frase:
"Los oídos descubren cosas antes que los libros."

},

{
tipo:"intervalo_visual",

pregunta:
"¿Cuál parece recorrer una mayor distancia?",

ejemplos:[

{

nombre:"DO - RE",

melodia:[
"C4",
"D4"
],

distancia:2

},

{

nombre:"DO - SOL",

melodia:[
"C4",
"G4"
],

distancia:7

}

],

opciones:[

"DO - RE",

"DO - SOL"

],

correcta:1,

tituloVisual:
"Compará ambos recorridos",

explicacion:
"El segundo recorrido llega mucho más lejos. Entre dos notas puede haber distintas distancias."

},

{
tipo:"texto",

texto:

"Acabás de descubrir algo importante.\n\nLas notas no siempre están igual de separadas.\n\nMás adelante aprenderás a medir esas distancias."

}

]
},

{
id:"m3m2",

titulo:
"El camino más corto",

descripcion:
"Descubrí la distancia más pequeña utilizada en música.",

xp:60,

pasos:[

{
tipo:"detras_de_la_musica",

titulo:
"¿Cuál es el paso más pequeño?",

texto:[

"Ahora ya sabés que algunas notas están más lejos que otras.",

"Pero existe una distancia muy especial.",

"Es el paso más pequeño que utilizamos para construir toda la música."

],

frase:
"Intentá descubrirla antes de que te la expliquemos."

},

{
tipo:"intervalo_visual",

pregunta:
"¿Qué tienen en común?",

ejemplos:[

{

nombre:"DO - DO#",

melodia:[
"C4",
"C#4"
],

distancia:1

},

{

nombre:"MI - FA",

melodia:[
"E4",
"F4"
],

distancia:1

}

],

opciones:[

"Son notas muy alejadas",

"Son notas vecinas",

"Son la misma nota"

],

correcta:1,

tituloVisual:
"Observá las dos parejas",

explicacion:
"En ambos ejemplos las notas están una al lado de la otra. Esa es la menor distancia posible."

},

{
tipo:"piano_interactivo",

modo:"exploracion",

pregunta:
"Explorá el teclado. Tocá las notas vecinas.",

notasResaltadas:[

"C4",
"C#4"

]

},

{
tipo:"texto",

texto:

"Cuando dos notas están tan cerca que no existe ninguna otra entre ellas, esa distancia recibe un nombre."

},

{
tipo:"teoria",

titulo:
"Semitono",

texto:

"El semitono es la distancia más pequeña utilizada en la música occidental."

},

{
tipo:"detras_de_la_musica",

titulo:
"Los guitarristas hacen esto todo el tiempo",

texto:[

"Cada traste de una guitarra representa exactamente un semitono.",

"Mover un solo dedo un traste cambia completamente el sonido."

],

video:
"https://www.youtube.com/embed/iVqRf6Cs_yg",

frase:
"Un solo semitono puede cambiar toda una canción."

},

{
tipo:"comparacion",

pregunta:
"¿Cuál de estas parejas está separada por la distancia más pequeña?",

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
"D4"
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
id:"m3m3",

titulo:
"El paso completo",

descripcion:
"Descubrí que algunas distancias son más grandes que otras.",

xp:60,

pasos:[

{
tipo:"detras_de_la_musica",

titulo:
"No todas las distancias son iguales",

texto:[

"Ya descubriste el semitono.",

"Ahora vas a compararlo con otra distancia muy común.",

"Escuchá con atención."

],

frase:
"Comparar es la mejor forma de aprender a escuchar."

},

{
tipo:"comparacion",

pregunta:
"¿Cuál de estas parejas está más separada?",

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
"D4"
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
tipo:"piano_interactivo",

modo:"exploracion",

pregunta:
"Explorá DO, DO# y RE.",

notasResaltadas:[

"C4",
"C#4",
"D4"

]

},

{
tipo:"texto",

texto:

"Entre DO y RE hay dos semitonos. Esa distancia recibe otro nombre."

},

{
tipo:"teoria",

titulo:
"Tono",

texto:

"Un tono equivale a dos semitonos."

},

{
tipo:"comparacion",

pregunta:
"¿Cuál es un tono?",

ejemplos:[

{
nombre:"A",
melodia:[
"E4",
"F4"
]
},

{
nombre:"B",
melodia:[
"G4",
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
id:"m3m4",

titulo:
"Midiendo la música",

descripcion:
"Aprendé a distinguir tonos y semitonos.",

xp:70,

pasos:[

{
tipo:"comparacion",

pregunta:
"¿Qué distancia escuchás?",

ejemplos:[

{
nombre:"A",
melodia:[
"C4",
"C#4"
]
}

],

opciones:[

"Semitono",
"Tono"

],

correcta:0

},

{
tipo:"comparacion",

pregunta:
"¿Qué distancia escuchás?",

ejemplos:[

{
nombre:"A",
melodia:[
"D4",
"E4"
]
}

],

opciones:[

"Semitono",
"Tono"

],

correcta:1

},

{
tipo:"comparacion",

pregunta:
"¿Qué distancia escuchás?",

ejemplos:[

{
nombre:"A",
melodia:[
"B4",
"C5"
]
}

],

opciones:[

"Semitono",
"Tono"

],

correcta:0

},

{
tipo:"comparacion",

pregunta:
"¿Qué distancia escuchás?",

ejemplos:[

{
nombre:"A",
melodia:[
"F4",
"G4"
]
}

],

opciones:[

"Semitono",
"Tono"

],

correcta:1

},

{
tipo:"texto",

texto:

"Ya podés reconocer las dos distancias fundamentales de la música."

}

]

},

{
id:"m3m5",

titulo:
"Las distancias tienen nombre",

descripcion:
"Descubrí cómo llaman los músicos a la distancia entre dos notas.",

xp:70,

pasos:[

{
tipo:"detras_de_la_musica",

titulo:
"Ahora sí podemos ponerle nombre",

texto:[

"Hasta ahora comparaste sonidos.",

"Descubriste tonos y semitonos.",

"En realidad, todo el tiempo estuviste midiendo una misma cosa."

],

frase:
"Primero la experiencia. Después las palabras."

},

{
tipo:"comparacion",

pregunta:
"¿Cuál de estas parejas tiene mayor distancia?",

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

},

{
tipo:"texto",

texto:

"Cada vez que comparabas dos notas, en realidad estabas observando la distancia entre ellas."

},

{
tipo:"teoria",

titulo:
"Intervalo",

texto:

"Un intervalo es la distancia entre dos notas.\n\nNo importa cuáles sean las notas. Siempre que compares dos sonidos existe un intervalo."

},

{
tipo:"comparacion",

pregunta:
"¿Cuál de estos también es un intervalo?",

ejemplos:[

{
nombre:"A",

melodia:[
"F4",
"A4"
]

},

{
nombre:"B",

melodia:[
"G4",
"B4"
]

}

],

opciones:[

"Los dos",
"Solo A",
"Solo B"

],

correcta:0

},

{
tipo:"texto",

texto:

"Desde ahora vamos a aprender a reconocer distintos tipos de intervalos. Cada uno tiene un sonido y una personalidad propia."

}

]

},

{
id:"m3m6",

titulo:
"Los intervalos tienen números",

descripcion:
"Descubrí por qué los músicos llaman segunda, tercera o quinta a las distancias.",

xp:80,


pasos:[


{
tipo:"detras_de_la_musica",

titulo:
"Las distancias tienen un orden",

texto:[

"Cuando los músicos hablan de intervalos no solo dicen si una distancia es grande o pequeña.",

"También le asignan un número.",

"Ese número aparece contando los nombres de las notas."

],

frase:
"Los intervalos tienen una lógica escondida en las notas."


},



{
tipo:"comparacion",

pregunta:
"Desde DO hasta RE, ¿cuántas notas contamos?",

ejemplos:[

{
nombre:"Ejemplo",

melodia:[

"C4",
"D4"

]

}

],

opciones:[

"Una",
"Dos",
"Tres"

],

correcta:1


},



{
tipo:"texto",

titulo:
"La segunda",

texto:

"DO y RE tienen dos nombres de nota:\n\nDO (1)\nRE (2)\n\nPor eso forman una segunda.\n\nEl número del intervalo viene de contar las notas que recorremos."


},



{
tipo:"comparacion",

pregunta:
"¿Cuál de estos intervalos es una tercera?",

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
"E4"

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
tipo:"texto",

titulo:
"Contar nombres, no distancia física",

texto:

"Una confusión común es pensar que el nombre del intervalo depende de los tonos o semitonos.\n\nPero primero contamos los nombres de las notas.\n\nDespués veremos qué tipo de segunda, tercera o quinta es."


},



{
tipo:"comparacion",

pregunta:
"¿Cuál de estos intervalos es una quinta?",

ejemplos:[

{

nombre:"A",

melodia:[

"C4",
"G4"

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


},



{
tipo:"texto",

texto:

"Ya descubriste la regla principal:\n\nDO-RE = segunda\nDO-MI = tercera\nDO-FA = cuarta\nDO-SOL = quinta\n\nEl número indica cuántos nombres de nota separan los sonidos."


}


]


},

{
id:"m3m7",

titulo:
"El primer intervalo",

descripcion:
"Descubrí por qué el unísono ocupa el primer lugar.",

xp:90,


pasos:[


{
tipo:"detras_de_la_musica",

titulo:
"¿Puede existir distancia sin moverse?",

texto:[

"Hasta ahora comparaste dos notas diferentes.",

"Pero existe un caso especial: cuando una nota se compara consigo misma.",

"Aunque no haya movimiento, los músicos también le dieron un nombre."

],

frase:
"Antes de caminar, primero existe el punto de partida."

},



{
tipo:"audio",

melodia:[

"C4",
"C4"

]

},



{
tipo:"texto",

titulo:
"El unísono",

texto:

"Cuando dos sonidos tienen exactamente la misma altura, forman un unísono.\n\nNo hay distancia entre ellos porque la nota no cambió."


},



{
tipo:"comparacion",

pregunta:
"¿Cuál de estos ejemplos es un unísono?",

ejemplos:[

{

nombre:"A",

melodia:[

"C4",
"C4"

]

},

{

nombre:"B",

melodia:[

"C4",
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

titulo:
"¿Por qué es la primera?",

texto:

"Los intervalos se numeran contando los nombres de las notas.\n\nSi empezamos en DO y seguimos contando:\n\nDO = 1\nRE = 2\nMI = 3\nFA = 4\nSOL = 5\n\nPor eso la misma nota ocupa el primer lugar."


},



{
tipo:"comparacion",

pregunta:
"¿Cuál empieza y termina en la misma nota?",

ejemplos:[

{

nombre:"A",

melodia:[

"G4",
"G4"

]

},

{

nombre:"B",

melodia:[

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
tipo:"piano_interactivo",

modo:"exploracion",

pregunta:
"Explorá el teclado. Encontrá una tecla y repetila.",

notasResaltadas:[

"C4"

]

},



{
tipo:"texto",

titulo:
"La familia empieza acá",

texto:

"Ahora tenemos el comienzo de la familia de intervalos:\n\nPrimera → unísono\nSegunda → una nota más adelante\nTercera → dos notas más adelante\n\nA partir de ahora vamos a descubrir cómo suena cada una."


}


]


},

{
id:"m3m8",

titulo:
"El primer paso: la segunda",

descripcion:
"Descubrí el intervalo que aparece cuando avanzamos una nota.",

xp:100,


pasos:[


{
tipo:"detras_de_la_musica",

titulo:
"Caminar una nota adelante",

texto:[

"Ya descubriste que el unísono es el punto de partida.",

"Ahora vamos a movernos un paso más adelante.",

"Cuando pasamos de una nota al siguiente nombre aparece la segunda."

],

frase:
"Un pequeño movimiento también tiene un nombre."


},



{
tipo:"comparacion",

pregunta:
"¿Cuál de estos ejemplos es una segunda?",

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

titulo:
"Contando nombres",

texto:

"DO y RE:\n\nDO (1)\nRE (2)\n\nPor eso forman una segunda.\n\nDO y MI tienen tres nombres contando la nota inicial, por eso forman una tercera."


},



{
tipo:"comparacion",

pregunta:
"¿Cuál de estos ejemplos NO es una segunda?",

ejemplos:[

{

nombre:"A",

melodia:[

"G4",
"A4"

]

},

{

nombre:"B",

melodia:[

"G4",
"B4"

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
tipo:"texto",

titulo:
"No todas las segundas suenan iguales",

texto:

"Escuchá dos ejemplos:\n\nDO-DO#\nDO-RE\n\nAmbos son segundas porque van desde DO hasta el siguiente nombre de nota.\n\nPero la distancia real entre sus sonidos es diferente."


},



{
tipo:"escucha_comparativa",

titulo:
"Dos segundas diferentes",

texto:
"Ambos ejemplos son segundas, pero tienen distinto tamaño.",

ejemplos:[

{
nombre:"Segunda menor",
melodia:[
"C4",
"C#4"
]
},

{
nombre:"Segunda mayor",
melodia:[
"C4",
"D4"
]
}

]

},



{
tipo:"comparacion",

pregunta:
"¿Cuál segunda suena más cerrada?",

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

titulo:
"Próximo paso",

texto:

"Ya sabés reconocer una segunda.\n\nAhora falta descubrir que existen diferentes tipos de segunda y cómo se construyen."

}


]


},

{
id:"m3m9",

titulo:
"Dos formas de dar un paso",

descripcion:
"Descubrí que una segunda puede tener diferentes tamaños.",

xp:110,


pasos:[


{
tipo:"detras_de_la_musica",

titulo:
"Una misma familia, diferentes sonidos",

texto:[

"Ya sabés que DO-RE es una segunda.",

"Pero no todas las segundas tienen exactamente la misma distancia.",

"Algunas están más apretadas y otras tienen un poco más de espacio."

],

frase:
"El nombre nos dice la familia. La distancia exacta nos dice cuál es."


},



{
tipo:"comparacion",

pregunta:
"¿Cuál de estos movimientos está más cerca?",

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

titulo:
"La segunda menor",

texto:

"Cuando dos notas están separadas por un solo semitono y además forman una segunda, tenemos una segunda menor.\n\nEjemplo:\nDO → DO#"


},



{
tipo:"escucha_comparativa",

titulo:
"Escuchá la diferencia",

texto:
"Ambos son segundas, pero una está más cerrada que la otra.",

ejemplos:[

{
nombre:"Segunda menor",
melodia:[
"C4",
"C#4"
]
},

{
nombre:"Segunda mayor",
melodia:[
"C4",
"D4"
]
}

]

},



{
tipo:"comparacion",

pregunta:
"¿Cuál ejemplo tiene una segunda mayor?",

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
"D4"

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
tipo:"texto",

titulo:
"La segunda mayor",

texto:

"Cuando una segunda ocupa dos semitonos, recibe el nombre de segunda mayor.\n\nEjemplo:\nDO → RE\n\nSigue siendo una segunda porque contamos DO y RE."


},




{
tipo:"comparacion",

pregunta:
"¿Cuál es una segunda menor?",

ejemplos:[

{

nombre:"A",

melodia:[

"E4",
"F4"

]

},

{

nombre:"B",

melodia:[

"E4",
"F#4"

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

titulo:
"La idea principal",

texto:

"Segunda no significa una cantidad fija de semitonos.\n\nSegunda significa la relación entre nombres de notas.\n\nDespués medimos su tamaño:\n\n1 semitono → segunda menor\n2 semitonos → segunda mayor"


}


]


},

{
id:"m3m10",

titulo:
"Un paso más lejos",

descripcion:
"Descubrí que algunos intervalos abarcan más nombres de notas.",

xp:120,


pasos:[


{
tipo:"detras_de_la_musica",

titulo:
"No todas las distancias son pasos pequeños",

texto:[

"Hasta ahora conociste las segundas.",

"Una segunda ocurre cuando pasamos de una nota a la siguiente en el nombre de las notas.",

"Pero la música también utiliza saltos más grandes."

],

frase:
"Algunas melodías caminan. Otras saltan."

},



{
tipo:"comparacion",

pregunta:
"¿Cuál de estas parejas parece dar un salto más grande?",

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
"E4"

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
tipo:"texto",

titulo:
"Contar nombres de notas",

texto:

"Para saber qué intervalo es, primero contamos los nombres de las notas.\n\nDO → RE\n\nDO y RE ocupan dos nombres diferentes, por eso es una segunda.\n\nDO → MI\n\nDO, RE y MI forman tres nombres, por eso es una tercera."

},



{
tipo:"escucha_comparativa",

titulo:
"Paso o salto",

texto:
"Escuchá cómo cambia la sensación cuando pasamos de una segunda a una tercera.",

ejemplos:[

{
nombre:"Segunda",
melodia:[
"C4",
"D4"
]
},

{
nombre:"Tercera",
melodia:[
"C4",
"E4"
]
}

]

},


{
tipo:"comparacion",

pregunta:
"¿Cuál de estos intervalos es una segunda?",

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

titulo:
"La tercera aparece",

texto:

"Cuando contamos tres nombres de notas obtenemos una tercera.\n\nEjemplos:\n\nDO → MI\n\nRE → FA\n\nMI → SOL\n\nEl tamaño en semitonos puede cambiar, pero la relación de nombres sigue siendo una tercera."

},



{
tipo:"comparacion",

pregunta:
"¿Cuál de estas parejas es una tercera?",

ejemplos:[

{

nombre:"A",

melodia:[

"F4",
"A4"

]

},

{

nombre:"B",

melodia:[

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

},



{
tipo:"texto",

titulo:
"Del paso al salto",

texto:

"Ahora conocés dos familias de intervalos:\n\nSegunda → movimiento entre notas vecinas.\n\nTercera → un salto que deja una nota intermedia.\n\nMás adelante descubriremos que cada una puede tener diferentes tamaños."

}


]


},

        ]

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

        misiones:[


        ]

    }

}