import json
from pathlib import Path

base = Path(__file__).resolve().parent

posts = {
    'como-lidar-com-a-ansiedade.json': {
        'title': 'Como lidar com a ansiedade no dia a dia',
        'date': '2026-06-13',
        'author': 'Lucilena Vogel',
        'excerpt': 'A ansiedade é uma das queixas mais comuns na clínica psicológica. Entender como ela funciona é o primeiro passo para encontrar equilíbrio emocional.',
        'image': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
        'content': (
            '<p>A ansiedade é uma resposta natural do organismo a situações de ameaça ou incerteza. Em doses equilibradas, ela nos ajuda a nos preparar para desafios. Mas quando passa a ser constante ou desproporcional, pode comprometer significativamente a qualidade de vida.</p>'
            '<img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80" alt="Pessoa refletindo sobre ansiedade">'
            '<h2>Por que a ansiedade aparece?</h2>'
            '<p>Do ponto de vista cognitivo-comportamental, a ansiedade está intimamente ligada à forma como interpretamos as situações ao nosso redor. Pensamentos do tipo <em>"e se algo der errado?"</em> ou <em>"não vou conseguir lidar"</em> alimentam um ciclo de preocupação que pode se tornar difícil de interromper.</p>'
            '<p>É importante compreender que sentir ansiedade não significa fraqueza — significa que você está humano. O problema surge quando esse estado se torna crônico e passa a limitar escolhas, relacionamentos e bem-estar.</p>'
            '<h2>Estratégias práticas para o cotidiano</h2>'
            '<ul><li><strong>Respiração diafragmática:</strong> respirar lentamente pelo nariz, retendo o ar por alguns segundos e soltando devagar pela boca ajuda a ativar o sistema nervoso parassimpático, reduzindo a resposta de alerta do corpo.</li>'
            '<li><strong>Registro de pensamentos:</strong> anotar o que está gerando preocupação e questionar a evidência real por trás desses pensamentos é uma ferramenta central da TCC.</li>'
            '<li><strong>Atividade física regular:</strong> mesmo caminhadas curtas contribuem para a regulação emocional e a liberação de neurotransmissores relacionados ao bem-estar.</li>'
            '<li><strong>Rotina e previsibilidade:</strong> estruturar o dia reduz a sensação de caos e incerteza que muitas vezes alimenta a ansiedade.</li></ul>'
            '<h2>Quando buscar ajuda profissional?</h2>'
            '<p>Se a ansiedade está interferindo no trabalho, nos relacionamentos ou no sono de forma persistente, é importante buscar acompanhamento psicológico. A psicoterapia, especialmente a Terapia Cognitivo-Comportamental, oferece ferramentas concretas para compreender e transformar padrões de pensamento e comportamento e melhorar sua qualidade de vida.</p>'
        )
    },
    'como-melhorar-a-qualidade-do-sono-com-tcc.json': {
        'title': 'Como melhorar a qualidade do sono com a Terapia Cognitivo-Comportamental',
        'date': '2026-08-08',
        'author': 'Lucilena Vogel',
        'excerpt': 'Aprenda estratégias práticas da TCC para dormir melhor, reduzir a insônia e cuidar da sua saúde mental a partir de hábitos e pensamentos mais saudáveis.',
        'image': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
        'content': (
            '<p>O sono é uma necessidade básica do corpo e da mente, mas muitas pessoas convivem com noites mal dormidas, acordam cansadas ou vivem ansiedade ao se deitar. A Terapia Cognitivo-Comportamental (TCC) oferece ferramentas para melhorar a qualidade do sono a partir de mudanças no pensamento, na rotina e nas atitudes.</p>'
            '<img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80" alt="Pessoa descansando e aproveitando uma noite tranquila">'
            '<h2>Por que cuidar do sono também é cuidar da saúde mental?</h2>'
            '<p>O sono insuficiente ou de baixa qualidade pode aumentar irritabilidade, ansiedade, dificuldade de concentração e sensação de sobrecarga. Ao fortalecer a higiene do sono e reduzir padrões de pensamento que alimentam a insônia, você cria um ciclo mais saudável de descanso e bem-estar emocional.</p>'
            '<h2>Estratégias da TCC para dormir melhor</h2>'
            '<ul><li><strong>Estabeleça uma rotina consistente:</strong> vá para a cama e levante-se em horários regulares, mesmo nos finais de semana. Essa consistência ajuda o corpo a regular o relógio biológico.</li>'
            '<li><strong>Crie um ambiente acolhedor:</strong> mantenha o quarto escuro, silencioso e fresco. Use roupas leves e uma cama confortável para que o corpo associe o espaço ao descanso.</li>'
            '<li><strong>Faça uma transição suave para a noite:</strong> evite telas intensas, mensagens ou trabalho nas horas que antecedem o sono. Prefira atividades relaxantes, como leitura leve ou alongamentos.</li>'
            '<li><strong>Identifique pensamentos que atrapalham:</strong> inquietação, preocupações e “correria mental” são comuns antes de dormir. A TCC ajuda você a reconhecer e questionar essas ideias, substituindo-as por pensamentos mais tranquilos e realistas.</li>'
            '<li><strong>Use a técnica do registro:</strong> anote suas preocupações e um plano de ação antes de deitar. Isso reduz a atividade mental no momento de dormir e permite que você retome o controle da situação no dia seguinte.</li></ul>'
            '<h2>Quando a insônia se torna um padrão</h2>'
            '<p>Se você percebe que acorda várias vezes à noite, demora mais de 30 minutos para pegar no sono ou sente medo de ir dormir por causa da preocupação, vale a pena buscar ajuda profissional. A terapia pode ajudar você a entender os gatilhos e reorganizar a relação com o descanso.</p>'
        )
    }
}

for name, payload in posts.items():
    path = base / 'posts' / name
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Updated {name}')
