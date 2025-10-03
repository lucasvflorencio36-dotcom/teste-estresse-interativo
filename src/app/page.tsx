'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Brain, BarChart3, Save, RotateCcw, Calendar } from 'lucide-react'

interface Question {
  id: number
  text: string
  options: { value: number; label: string }[]
}

interface TestResult {
  id: string
  date: string
  score: number
  level: string
  timestamp: number
}

const questions: Question[] = [
  {
    id: 1,
    text: "Com que frequência você se sente sobrecarregado(a) com suas responsabilidades?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 2,
    text: "Você tem dificuldade para adormecer ou manter o sono?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 3,
    text: "Você se sente irritado(a) ou impaciente com facilidade?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 4,
    text: "Com que frequência você sente tensão muscular ou dores de cabeça?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 5,
    text: "Você tem dificuldade para se concentrar no trabalho ou estudos?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 6,
    text: "Você se sente ansioso(a) sobre o futuro?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 7,
    text: "Com que frequência você se sente cansado(a) mesmo após descansar?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 8,
    text: "Você tem mudanças no apetite (comer muito mais ou muito menos)?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 9,
    text: "Você se sente isolado(a) ou desconectado(a) dos outros?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 10,
    text: "Com que frequência você procrastina ou evita tarefas importantes?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 11,
    text: "Você sente que não tem tempo suficiente para relaxar?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 12,
    text: "Você tem pensamentos negativos recorrentes?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 13,
    text: "Com que frequência você se sente pressionado(a) por prazos?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 14,
    text: "Você tem dificuldade para tomar decisões?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 15,
    text: "Você se sente emocionalmente esgotado(a)?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 16,
    text: "Com que frequência você sente palpitações ou batimentos cardíacos acelerados?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 17,
    text: "Você tem dificuldade para relaxar mesmo durante o tempo livre?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 18,
    text: "Você se sente pessimista sobre sua situação atual?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 19,
    text: "Com que frequência você esquece coisas importantes?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 20,
    text: "Você sente que suas responsabilidades são maiores que sua capacidade?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 21,
    text: "Você tem mudanças bruscas de humor?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 22,
    text: "Com que frequência você se sente sem energia para atividades que antes gostava?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 23,
    text: "Você sente que não consegue controlar os eventos em sua vida?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 24,
    text: "Com que frequência você se preocupa excessivamente com problemas?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  },
  {
    id: 25,
    text: "Você sente que precisa de ajuda para lidar com o estresse?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Raramente" },
      { value: 2, label: "Às vezes" },
      { value: 3, label: "Frequentemente" },
      { value: 4, label: "Sempre" }
    ]
  }
]

const getStressLevel = (score: number) => {
  if (score <= 25) return { level: 'Baixo', color: 'bg-emerald-500', description: 'Seu nível de estresse está baixo. Continue mantendo hábitos saudáveis!' }
  if (score <= 50) return { level: 'Moderado', color: 'bg-yellow-500', description: 'Seu nível de estresse está moderado. Considere técnicas de relaxamento.' }
  if (score <= 75) return { level: 'Alto', color: 'bg-orange-500', description: 'Seu nível de estresse está alto. É importante buscar formas de reduzir o estresse.' }
  return { level: 'Muito Alto', color: 'bg-red-500', description: 'Seu nível de estresse está muito alto. Considere buscar ajuda profissional.' }
}

export default function StressTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [activeTab, setActiveTab] = useState('test')

  useEffect(() => {
    const savedResults = localStorage.getItem('stressTestResults')
    if (savedResults) {
      setTestResults(JSON.parse(savedResults))
    }
  }, [])

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateResults()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0)
    const percentage = (totalScore / 100) * 100
    const stressInfo = getStressLevel(percentage)
    
    const newResult: TestResult = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      score: Math.round(percentage),
      level: stressInfo.level,
      timestamp: Date.now()
    }

    const updatedResults = [...testResults, newResult].slice(-10) // Manter apenas os últimos 10 resultados
    setTestResults(updatedResults)
    localStorage.setItem('stressTestResults', JSON.stringify(updatedResults))
    
    setShowResults(true)
    setActiveTab('results')
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setActiveTab('test')
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentScore = Object.values(answers).reduce((sum, value) => sum + value, 0)
  const currentPercentage = (currentScore / 100) * 100
  const currentStressInfo = getStressLevel(currentPercentage)

  if (showResults) {
    const latestResult = testResults[testResults.length - 1]
    const stressInfo = getStressLevel(latestResult.score)

    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Resultado do Teste de Estresse
            </h1>
            <p className="text-slate-600">Análise completa do seu nível de estresse atual</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="results" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Resultado
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Histórico
              </TabsTrigger>
            </TabsList>

            <TabsContent value="results">
              <Card className="mb-6">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Seu Nível de Estresse</CardTitle>
                  <CardDescription>Baseado em suas respostas às 25 perguntas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-slate-800 mb-2">
                      {latestResult.score}%
                    </div>
                    <Badge className={`${stressInfo.color} text-white text-lg px-4 py-2`}>
                      Estresse {stressInfo.level}
                    </Badge>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full transition-all duration-1000 ${stressInfo.color}`}
                      style={{ width: `${latestResult.score}%` }}
                    />
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-2">Interpretação:</h3>
                    <p className="text-slate-600">{stressInfo.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">0-25%</div>
                      <div className="text-sm text-emerald-700">Estresse Baixo</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">26-50%</div>
                      <div className="text-sm text-yellow-700">Estresse Moderado</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">51-100%</div>
                      <div className="text-sm text-red-700">Estresse Alto/Muito Alto</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetTest} className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Fazer Novo Teste
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('history')} className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Ver Histórico
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Histórico de Resultados
                  </CardTitle>
                  <CardDescription>
                    Acompanhe a evolução do seu nível de estresse ao longo do tempo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {testResults.length > 0 ? (
                    <>
                      <div className="h-64 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={testResults}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip 
                              formatter={(value: number) => [`${value}%`, 'Nível de Estresse']}
                              labelFormatter={(label) => `Data: ${label}`}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="score" 
                              stroke="#0ea5e9" 
                              strokeWidth={3}
                              dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-800">Resultados Anteriores:</h4>
                        {testResults.slice().reverse().map((result) => {
                          const info = getStressLevel(result.score)
                          return (
                            <div key={result.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${info.color}`} />
                                <span className="text-slate-700">{result.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-800">{result.score}%</span>
                                <Badge variant="outline">{result.level}</Badge>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum resultado salvo ainda.</p>
                      <p className="text-sm">Faça o teste para começar a acompanhar seu histórico.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="mt-6 text-center">
                <Button onClick={resetTest} className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Fazer Novo Teste
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Teste de Avaliação de Estresse
          </h1>
          <p className="text-slate-600">
            Responda às 25 perguntas para avaliar seu nível atual de estresse
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-lg">
                Pergunta {currentQuestion + 1} de {questions.length}
              </CardTitle>
              <Badge variant="outline" className="text-sm">
                {Math.round(progress)}% concluído
              </Badge>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg font-medium text-slate-800 leading-relaxed">
              {questions[currentQuestion].text}
            </div>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:border-sky-300 hover:bg-sky-50 ${
                    answers[questions[currentQuestion].id] === option.value
                      ? 'border-sky-500 bg-sky-100 text-sky-800'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      answers[questions[currentQuestion].id] === option.value
                        ? 'border-sky-500 bg-sky-500'
                        : 'border-slate-300'
                    }`}>
                      {answers[questions[currentQuestion].id] === option.value && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {Object.keys(answers).length > 0 && (
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                  <span>Nível atual estimado:</span>
                  <span className="font-medium">{Math.round(currentPercentage)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${currentStressInfo.color}`}
                    style={{ width: `${currentPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            ← Anterior
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={answers[questions[currentQuestion].id] === undefined}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700"
          >
            {currentQuestion === questions.length - 1 ? (
              <>
                <Save className="w-4 h-4" />
                Finalizar Teste
              </>
            ) : (
              'Próxima →'
            )}
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              variant="ghost"
              onClick={() => {
                setShowResults(true)
                setActiveTab('history')
              }}
              className="text-slate-600 hover:text-slate-800"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Ver Histórico de Resultados
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}