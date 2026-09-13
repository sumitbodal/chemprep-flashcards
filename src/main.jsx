import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const allCards = [
  {
    id: 'osmotic-pressure',
    unit: 'Solutions',
    question: 'What is the formula for Osmotic Pressure?',
    answer: (
      <>
        <span className="equation">π = iCRT</span>
        <p>Where i = van&apos;t Hoff factor, C = Molarity, R = Gas constant, T = Temperature in Kelvin.</p>
      </>
    ),
    tip: 'Always convert temperature to Kelvin and volume to Liters before calculating C.',
  },
  {
    id: 'boiling-point-elevation',
    unit: 'Solutions',
    question: 'State the formula for Elevation in Boiling Point.',
    answer: (
      <>
        <span className="equation">ΔT<sub>b</sub> = i × K<sub>b</sub> × m</span>
      </>
    ),
    tip: "Remember that 'm' is molality (moles of solute / kg of solvent), NOT molarity.",
  },
  {
    id: 'nernst-equation',
    unit: 'Electrochemistry',
    question: 'Write the Nernst Equation for cell potential at 25°C.',
    answer: (
      <>
        <span className="equation">E = E° − (0.0591 / n) log Q</span>
        <p>Where n = number of electrons transferred, Q = reaction quotient.</p>
      </>
    ),
    tip: 'Board favorite: Use this to find the equilibrium constant (Kc) by setting E = 0.',
  },
  {
    id: 'kohlrausch-law',
    unit: 'Electrochemistry',
    question: "State Kohlrausch's law of independent migration of ions.",
    answer: (
      <>
        <span className="equation">Λ°<sub>m</sub> = λ°<sub>+</sub> + λ°<sub>−</sub></span>
        <p>The limiting molar conductivity of an electrolyte is the sum of the individual contributions of the anion and cation.</p>
      </>
    ),
    tip: 'Frequently asked as a 2-mark numerical to find the conductivity of a weak acid.',
  },
  {
    id: 'first-order-rate-law',
    unit: 'Chemical Kinetics',
    question: 'What is the integrated rate equation for a First Order reaction?',
    answer: (
      <>
        <span className="equation">k = (2.303 / t) log([A]<sub>0</sub> / [A])</span>
      </>
    ),
    tip: "If they give you percentages (e.g., 'completed 75%'), set [A]0 = 100 and [A] = 25.",
  },
  {
    id: 'first-order-half-life',
    unit: 'Chemical Kinetics',
    question: 'What is the formula for the Half-life of a First Order reaction?',
    answer: (
      <>
        <span className="equation">t<sub>1/2</sub> = 0.693 / k</span>
      </>
    ),
    tip: 'Notice that half-life for first-order kinetics is completely independent of initial concentration!',
  },
  {
    id: 'arrhenius-equation',
    unit: 'Chemical Kinetics',
    question: 'Write the Arrhenius Equation relating rate constant and temperature.',
    answer: (
      <>
        <span className="equation">k = A e<sup>−E<sub>a</sub>/RT</sup></span>
        <p>Log form: log(k<sub>2</sub>/k<sub>1</sub>) = (E<sub>a</sub> / 2.303R) × (1/T<sub>1</sub> − 1/T<sub>2</sub>)</p>
      </>
    ),
    tip: 'Be extremely careful with units. R is usually 8.314 J/(K·mol), so Ea must be in Joules, not kJ.',
  },
  {
    id: 'octahedral-tetrahedral-splitting',
    unit: 'Coordination Compounds',
    question: 'What is the relationship between crystal field splitting in octahedral (Δo) and tetrahedral (Δt) complexes?',
    answer: (
      <>
        <span className="equation">Δ<sub>t</sub> = (4/9) Δ<sub>o</sub></span>
      </>
    ),
    tip: 'Tetrahedral complexes are rarely low-spin because the splitting energy is usually less than pairing energy.',
  },
  {
    id: 'spin-only-magnetic-moment',
    unit: 'Coordination Compounds',
    question: "How do you calculate the 'spin-only' magnetic moment?",
    answer: (
      <>
        <span className="equation">μ = √(n(n + 2)) BM</span>
        <p>Where n = number of unpaired electrons.</p>
      </>
    ),
    tip: "BM stands for Bohr Magneton. Don't forget to write the unit in your final answer!",
  },
  {
    id: 'aldol-condensation',
    unit: 'Aldehydes & Ketones',
    question: 'Describe the Aldol Condensation reaction.',
    answer: (
      <>
        <p>Aldehydes or ketones containing at least one α-hydrogen react in the presence of dilute alkali (like NaOH) to form β-hydroxy aldehydes (aldol) or β-hydroxy ketones (ketol).</p>
      </>
    ),
    tip: "Always check for the α-hydrogen! If it doesn't have one (like formaldehyde), it undergoes the Cannizzaro reaction instead.",
  },
  {
    id: 'hofmann-bromamide',
    unit: 'Amines',
    question: 'What is the Hofmann Bromamide Degradation reaction?',
    answer: (
      <>
        <span className="equation">R-CONH<sub>2</sub> + Br<sub>2</sub> + 4NaOH → R-NH<sub>2</sub> + Na<sub>2</sub>CO<sub>3</sub> + 2NaBr + 2H<sub>2</sub>O</span>
      </>
    ),
    tip: 'Crucial for step-down conversions: The resulting primary amine has ONE carbon less than the original amide.',
  },
  {
    id: 'reimer-tiemann',
    unit: 'Alcohols & Phenols',
    question: 'Describe the Reimer-Tiemann Reaction.',
    answer: (
      <>
        <p>Treating Phenol with chloroform (CHCl<sub>3</sub>) in the presence of aqueous NaOH at 340K, followed by hydrolysis, yields Salicylaldehyde.</p>
      </>
    ),
    tip: 'The intermediate formed is a substituted benzal chloride. Mentioning the intermediate often secures full marks.',
  },
  {
    id: 'transition-color',
    unit: 'd- and f-Block Elements',
    question: 'Why are transition metal compounds often coloured?',
    answer: (
      <>
        <span className="equation">d → d* transition</span>
        <p>Electrons absorb visible light while moving between split d-orbitals, producing the complementary colour.</p>
      </>
    ),
    tip: 'Remember: colour arises because of crystal field splitting, not because the metal is necessarily coloured itself.',
  },
  {
    id: 'adsorption',
    unit: 'Surface Chemistry',
    question: 'What is adsorption?',
    answer: (
      <>
        <span className="equation">Surface phenomenon</span>
        <p>It is the accumulation of a substance at the surface of another substance.</p>
      </>
    ),
    tip: 'Adsorption is different from absorption: the substance sticks to the surface rather than dissolving throughout.',
  },
  {
    id: 'raoults-law',
    unit: 'Solutions',
    question: "State Raoult's law for a solution of volatile liquids.",
    answer: (
      <>
        <span className="equation">p<sub>i</sub> = x<sub>i</sub> p<sup>0</sup><sub>i</sub></span>
        <p>The partial vapour pressure of each component equals its mole fraction multiplied by its vapour pressure in the pure state.</p>
      </>
    ),
    tip: 'For an ideal solution, the total vapour pressure is the sum of the partial pressures of all components.',
  },
  {
    id: 'henrys-law',
    unit: 'Solutions',
    question: "What does Henry's law state?",
    answer: (
      <>
        <span className="equation">p = K<sub>H</sub> x</span>
        <p>At constant temperature, the partial pressure of a gas above a solution is proportional to its mole fraction in the solution.</p>
      </>
    ),
    tip: 'A larger KH means lower solubility of the gas in the liquid.',
  },
  {
    id: 'standard-cell-potential',
    unit: 'Electrochemistry',
    question: 'How is the standard cell potential calculated?',
    answer: (
      <>
        <span className="equation">E°<sub>cell</sub> = E°<sub>cathode</sub> − E°<sub>anode</sub></span>
        <p>The cathode is the reduction electrode and the anode is the oxidation electrode.</p>
      </>
    ),
    tip: 'Do not add oxidation and reduction potentials when both values are listed as reduction potentials.',
  },
  {
    id: 'faradays-first-law',
    unit: 'Electrochemistry',
    question: "State Faraday's first law of electrolysis.",
    answer: (
      <>
        <span className="equation">m ∝ Q</span>
        <p>The mass of a substance deposited or liberated at an electrode is directly proportional to the quantity of electricity passed.</p>
      </>
    ),
    tip: 'Use m = ZIt for numericals, where I is current and t is time in seconds.',
  },
  {
    id: 'zero-order-half-life',
    unit: 'Chemical Kinetics',
    question: 'What is the half-life equation for a zero-order reaction?',
    answer: (
      <>
        <span className="equation">t<sub>1/2</sub> = [R]<sub>0</sub> / 2k</span>
        <p>Unlike a first-order reaction, the half-life depends directly on the initial concentration.</p>
      </>
    ),
    tip: 'The concentration-versus-time graph for a zero-order reaction is a straight line with slope −k.',
  },
  {
    id: 'activation-energy-catalyst',
    unit: 'Chemical Kinetics',
    question: 'How does a catalyst affect activation energy?',
    answer: (
      <>
        <span className="equation">E<sub>a</sub> decreases</span>
        <p>A catalyst provides an alternative reaction pathway with lower activation energy, increasing the rate without changing the equilibrium constant.</p>
      </>
    ),
    tip: 'A catalyst changes both forward and reverse rates, so it does not shift the position of equilibrium.',
  },
  {
    id: 'schottky-defect',
    unit: 'The Solid State',
    question: 'What is a Schottky defect?',
    answer: (
      <>
        <span className="equation">Equal cation and anion vacancies</span>
        <p>Some ions are missing from their normal lattice positions, maintaining electrical neutrality but lowering the density of the crystal.</p>
      </>
    ),
    tip: 'Schottky defect is common in ionic solids with similar-sized ions, such as NaCl and CsCl.',
  },
  {
    id: 'unit-cell-density',
    unit: 'The Solid State',
    question: 'Write the density formula for a crystal unit cell.',
    answer: (
      <>
        <span className="equation">ρ = ZM / (a<sup>3</sup> N<sub>A</sub>)</span>
        <p>Z is the number of particles per unit cell, M is molar mass, a is the edge length, and N<sub>A</sub> is Avogadro&apos;s constant.</p>
      </>
    ),
    tip: 'Convert the edge length to centimetres when density is required in g cm−3.',
  },
  {
    id: 'd-block-variable-oxidation',
    unit: 'd- and f-Block Elements',
    question: 'Why do transition elements show variable oxidation states?',
    answer: (
      <>
        <span className="equation">(n−1)d and ns energies are similar</span>
        <p>Electrons from both the (n−1)d and ns orbitals can participate in bonding, allowing more than one oxidation state.</p>
      </>
    ),
    tip: 'The oxidation states differ by one or more units because successive d-electrons can also be removed.',
  },
  {
    id: 'lanthanide-contraction',
    unit: 'd- and f-Block Elements',
    question: 'What is lanthanide contraction?',
    answer: (
      <>
        <span className="equation">Gradual decrease in Ln<sup>3+</sup> size</span>
        <p>It is the steady decrease in the atomic and ionic radii of lanthanides from La to Lu due to ineffective shielding by 4f electrons.</p>
      </>
    ),
    tip: 'Lanthanide contraction explains the very similar sizes and properties of zirconium and hafnium.',
  },
  {
    id: 'coordination-isomerism',
    unit: 'Coordination Compounds',
    question: 'What is coordination isomerism?',
    answer: (
      <>
        <span className="equation">Ligand exchange between complex ions</span>
        <p>It occurs in compounds containing both cationic and anionic complex ions when ligands are interchanged between the two metal centres.</p>
      </>
    ),
    tip: 'This type of isomerism is possible only when both the cation and anion are complex ions.',
  },
  {
    id: 'werner-theory',
    unit: 'Coordination Compounds',
    question: 'What are primary and secondary valencies in Werner&apos;s theory?',
    answer: (
      <>
        <span className="equation">Primary = oxidation state; Secondary = coordination number</span>
        <p>Primary valencies are ionisable, while secondary valencies are satisfied by ligands and are directional.</p>
      </>
    ),
    tip: 'Secondary valencies determine the geometry of a coordination compound.',
  },
  {
    id: 'sn1-sn2',
    unit: 'Haloalkanes & Haloarenes',
    question: 'Which mechanism is favoured by a tertiary haloalkane in a polar protic solvent?',
    answer: (
      <>
        <span className="equation">S<sub>N</sub>1</span>
        <p>A stable tertiary carbocation forms readily, making the two-step S<sub>N</sub>1 mechanism favourable.</p>
      </>
    ),
    tip: 'S<sub>N</sub>1 reactions are unimolecular and their rate depends only on the concentration of the haloalkane.',
  },
  {
    id: 'grignard-reagent',
    unit: 'Alcohols & Phenols',
    question: 'What is the product when a Grignard reagent reacts with formaldehyde followed by hydrolysis?',
    answer: (
      <>
        <span className="equation">RMgX + HCHO → RCH<sub>2</sub>OH</span>
        <p>It produces a primary alcohol containing one additional carbon atom after acidic hydrolysis.</p>
      </>
    ),
    tip: 'Grignard reagents must be prepared and used in dry ether because water destroys them.',
  },
  {
    id: 'phenol-acidity',
    unit: 'Alcohols & Phenols',
    question: 'Why is phenol more acidic than ethanol?',
    answer: (
      <>
        <span className="equation">Phenoxide ion is resonance-stabilised</span>
        <p>The negative charge in phenoxide is delocalised into the aromatic ring, while the ethoxide ion has no comparable resonance stabilisation.</p>
      </>
    ),
    tip: 'Electron-withdrawing groups increase phenol acidity; electron-donating groups decrease it.',
  },
  {
    id: 'cannizzaro-reaction',
    unit: 'Aldehydes & Ketones',
    question: 'Which aldehydes undergo the Cannizzaro reaction?',
    answer: (
      <>
        <span className="equation">Aldehydes without α-hydrogen</span>
        <p>In concentrated alkali, two molecules undergo simultaneous oxidation and reduction to form an alcohol and a carboxylate salt.</p>
      </>
    ),
    tip: 'Formaldehyde and benzaldehyde are common examples because neither has an α-hydrogen.',
  },
  {
    id: 'tollens-test',
    unit: 'Aldehydes & Ketones',
    question: 'What is the observation in Tollens&apos; test for an aldehyde?',
    answer: (
      <>
        <span className="equation">Silver mirror</span>
        <p>An aldehyde reduces Tollens&apos; reagent to metallic silver while the aldehyde is oxidised to a carboxylate ion.</p>
      </>
    ),
    tip: 'Most ketones do not give Tollens&apos; test, making it useful for distinguishing aldehydes from ketones.',
  },
  {
    id: 'amine-basicity',
    unit: 'Amines',
    question: 'Why are aliphatic amines generally more basic than ammonia?',
    answer: (
      <>
        <span className="equation">+I effect of alkyl groups</span>
        <p>Alkyl groups push electron density toward nitrogen, making its lone pair more available for protonation.</p>
      </>
    ),
    tip: 'In aqueous solution, solvation also affects basicity, so the order can differ from the gas phase.',
  },
  {
    id: 'diazotisation',
    unit: 'Amines',
    question: 'What is diazotisation of aniline?',
    answer: (
      <>
        <span className="equation">C<sub>6</sub>H<sub>5</sub>NH<sub>2</sub> → C<sub>6</sub>H<sub>5</sub>N<sub>2</sub><sup>+</sup>Cl<sup>−</sup></span>
        <p>Aniline reacts with sodium nitrite and hydrochloric acid at 273–278 K to form benzene diazonium chloride.</p>
      </>
    ),
    tip: 'Keep the temperature between 273 and 278 K; diazonium salts can decompose at higher temperatures.',
  },
  {
    id: 'biomolecules-protein-bond',
    unit: 'Biomolecules',
    question: 'What bond joins amino acids in a protein?',
    answer: (
      <>
        <span className="equation">Peptide bond: −CO−NH−</span>
        <p>A peptide bond forms by condensation between the carboxyl group of one amino acid and the amino group of another.</p>
      </>
    ),
    tip: 'A dipeptide contains two amino acids and one peptide bond; a polypeptide contains many residues.',
  },
  {
    id: 'dna-rna',
    unit: 'Biomolecules',
    question: 'Give one major difference between DNA and RNA.',
    answer: (
      <>
        <span className="equation">DNA: deoxyribose; RNA: ribose</span>
        <p>DNA usually forms a double helix and contains thymine, whereas RNA is usually single-stranded and contains uracil.</p>
      </>
    ),
    tip: 'Remember that both DNA and RNA contain adenine, guanine, and cytosine.',
  },
  {
    id: 'addition-polymer',
    unit: 'Polymers',
    question: 'What is an addition polymerisation reaction?',
    answer: (
      <>
        <span className="equation">n CH<sub>2</sub>=CH<sub>2</sub> → (−CH<sub>2</sub>−CH<sub>2</sub>−)<sub>n</sub></span>
        <p>Unsaturated monomers add together without elimination of small molecules to form a polymer.</p>
      </>
    ),
    tip: 'Polyethene, PVC, and Teflon are common examples of addition polymers.',
  },
  {
    id: 'medicines-antacid',
    unit: 'Chemistry in Everyday Life',
    question: 'What is the purpose of an antacid?',
    answer: (
      <>
        <span className="equation">Neutralise excess stomach acid</span>
        <p>Antacids are mild bases that neutralise excess hydrochloric acid in the stomach and relieve acidity.</p>
      </>
    ),
    tip: 'Antacids provide quick relief but do not treat the underlying cause of excess acid production.',
  },
];

const readProgress = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const saved = window.localStorage.getItem('chemprep-progress');
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    return {};
  }
};

function AtomMark() {
  return (
    <div className="atom-mark" aria-hidden="true">
      <span className="atom-core">C</span>
      <i className="orbit orbit-one" />
      <i className="orbit orbit-two" />
      <i className="orbit orbit-three" />
    </div>
  );
}

function ShuffleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 3h4v4M3 7h2.6c1.2 0 2.2.5 3 1.4l5.8 7.2c.7.9 1.8 1.4 3 1.4H21M17 21h4v-4M3 17h2.6c1.2 0 2.2-.5 3-1.4l1.1-1.4M14.4 8.8l1.9-2.4c.7-.9 1.8-1.4 3-1.4H21" />
    </svg>
  );
}

function Arrow({ direction }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === 'left' ? 'M19 12H5m7 7-7-7 7-7' : 'M5 12h14m-7-7 7 7-7 7'} />
    </svg>
  );
}

function App() {
  const [cards, setCards] = useState(allCards);
  const [filter, setFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewState, setReviewState] = useState(readProgress);
  const [statusMessage, setStatusMessage] = useState('');

  const units = useMemo(() => ['All', ...new Set(cards.map((card) => card.unit))], [cards]);
  const filteredCards = useMemo(
    () => (filter === 'All' ? cards : cards.filter((card) => card.unit === filter)),
    [cards, filter],
  );

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filter]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('chemprep-progress', JSON.stringify(reviewState));
    }
  }, [reviewState]);

  useEffect(() => {
    if (!statusMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => setStatusMessage(''), 900);
    return () => window.clearTimeout(timer);
  }, [statusMessage]);

  const currentCard = filteredCards[currentIndex] ?? filteredCards[0];
  const progress = filteredCards.length ? ((currentIndex + 1) / filteredCards.length) * 100 : 0;
  const masteredCount = cards.filter((card) => reviewState[card.id] === 'mastered').length;
  const needsReviewCount = cards.filter((card) => reviewState[card.id] === 'needs-review').length;
  const newCount = cards.length - masteredCount - needsReviewCount;

  const moveCard = (direction) => {
    if (!filteredCards.length) {
      return;
    }

    setIsFlipped(false);
    setCurrentIndex((index) => (index + direction + filteredCards.length) % filteredCards.length);
  };

  const shuffleCards = () => {
    setCards((currentCards) => {
      const nextCards = [...currentCards];
      for (let i = nextCards.length - 1; i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [nextCards[i], nextCards[randomIndex]] = [nextCards[randomIndex], nextCards[i]];
      }
      return nextCards;
    });
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const recordStatus = (status) => {
    if (!currentCard) {
      return;
    }

    setReviewState((previous) => ({ ...previous, [currentCard.id]: status }));
    setStatusMessage(status === 'needs-review' ? 'Marked for review.' : 'Great job — marked as mastered.');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!filteredCards.length) {
        return;
      }

      if (event.code === 'Space') {
        event.preventDefault();
        setIsFlipped((flipped) => !flipped);
      } else if (event.key === 'ArrowLeft') {
        moveCard(-1);
      } else if (event.key === 'ArrowRight') {
        moveCard(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCards.length, currentIndex]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <AtomMark />
          <div>
            <p className="brand-name">ChemPrep</p>
            <p className="brand-subtitle">12th Standard Revision</p>
          </div>
        </div>
        <div className="progress-area">
          <span>
            Card {filteredCards.length ? currentIndex + 1 : 0} of {filteredCards.length}
          </span>
          <div className="progress-track" aria-label={`${Math.round(progress)}% complete`}>
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      <main className="study-area">
        <section className="intro">
          <p className="eyebrow"><span /> QUICK REVIEW SESSION</p>
          <h1>Build your chemistry confidence.</h1>
          <p className="intro-copy">Tap the card to reveal the answer, then keep your momentum going.</p>
        </section>

        <div className="stats-bar" aria-label="Study progress summary">
          <div className="stat-pill">
            <strong>{newCount}</strong>
            <span>New</span>
          </div>
          <div className="stat-pill">
            <strong>{needsReviewCount}</strong>
            <span>Review</span>
          </div>
          <div className="stat-pill accent">
            <strong>{masteredCount}</strong>
            <span>Mastered</span>
          </div>
        </div>

        <div className="unit-filter" aria-label="Filter by unit">
          {units.map((unit) => (
            <button
              key={unit}
              type="button"
              className={filter === unit ? 'unit-filter-button active' : 'unit-filter-button'}
              onClick={() => setFilter(unit)}
            >
              {unit}
            </button>
          ))}
        </div>

        <section className="flashcard-scene" aria-label="Chemistry flashcard">
          {currentCard ? (
            <button
              type="button"
              className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}
              onClick={() => setIsFlipped((flipped) => !flipped)}
              aria-label={isFlipped ? 'Show question' : 'Reveal answer'}
            >
              <span className="card-face card-front">
                <span className="card-topline">
                  <span className="topic-pill">{currentCard.unit}</span>
                  <span className="tap-hint"><span className="tap-dot" /> Tap to reveal</span>
                </span>
                <span className="question-mark">?</span>
                <span className="question">{currentCard.question}</span>
                <span className="card-footer">Think it through <span>before revealing</span></span>
              </span>
              <span className="card-face card-back">
                <span className="card-topline">
                  <span className="topic-pill blue-pill">{currentCard.unit}</span>
                  <span className="tap-hint">Answer revealed</span>
                </span>
                <span className="answer-label">THE KEY IDEA</span>
                <span className="answer-content">{currentCard.answer}</span>
                <span className="study-tip"><strong>TIP</strong> {currentCard.tip}</span>
                <span className="card-footer">Tap to return to question</span>
              </span>
            </button>
          ) : (
            <div className="empty-state">No cards in this unit yet.</div>
          )}
        </section>

        <div className="review-actions" aria-label="Mark card status">
          <button type="button" className="review-button review-danger" onClick={() => recordStatus('needs-review')}>
            Needs Review
          </button>
          <button type="button" className="review-button review-success" onClick={() => recordStatus('mastered')}>
            Got It!
          </button>
        </div>

        {statusMessage ? <div className="status-badge" role="status" aria-live="polite">{statusMessage}</div> : null}

        <nav className="controls" aria-label="Flashcard controls">
          <button type="button" className="control-button previous" onClick={() => moveCard(-1)}>
            <Arrow direction="left" />
            <span>Previous</span>
          </button>
          <button type="button" className="shuffle-button" onClick={shuffleCards} aria-label="Shuffle cards" title="Shuffle cards">
            <ShuffleIcon />
          </button>
          <button type="button" className="control-button next" onClick={() => moveCard(1)}>
            <span>Next card</span>
            <Arrow direction="right" />
          </button>
        </nav>
        <p className="keyboard-hint"><kbd>SPACE</kbd> to reveal <span>•</span> <kbd>←</kbd> <kbd>→</kbd> to navigate</p>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
