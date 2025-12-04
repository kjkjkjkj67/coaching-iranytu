import { ModelId, CoachingModelData } from './types';
import { Brain, TrendingUp, Sun, Scale } from 'lucide-react';

export const MODELS: Record<ModelId, CoachingModelData> = {
  [ModelId.SOCRATIC]: {
    id: ModelId.SOCRATIC,
    title: 'Szókratészi Kérdezéstechnika',
    subtitle: 'A gondolkodás megtisztítása',
    icon: Brain,
    color: 'indigo',
    essence: 'A módszer célja nem a megoldás, hanem a gondolkodás „kitakarítása”. Nem tanít, nem irányít — tisztáz.',
    coachState: [
      'Nem-tudás állapota',
      'Kíváncsiság',
      'Teljes mentalizáció: „Hogy lehet ez igaz az ő világában?”'
    ],
    utility: [
      'Hiedelmek, feltételezések, automatikus gondolatok feltárása',
      'Fogalmak pontosítása',
      'Érzelmek mögötti jelentések tisztázása'
    ],
    clientExperience: [
      'Lassulás',
      'Rácsodálkozás',
      'Új felismerések: „Én nem is így gondoltam, csak mondtam...”'
    ],
    typicalQuote: '„Mit is jelent ez valójában?”',
    bestUsedWhen: 'Amikor a kliens tele van történettel, hiedelemmel vagy zavaros belső logikával.',
    sequenceStep: 1,
    sequenceDescription: 'Tisztázás, lelassítás, a gondolkodás kisimítása'
  },
  [ModelId.MI]: {
    id: ModelId.MI,
    title: 'Motivációs Interjú (MI)',
    subtitle: 'Az ambivalencia feloldása',
    icon: Scale,
    color: 'rose',
    essence: 'A kliens egyszerre akarja is és fél is a változástól. A coach feladata láthatóvá tenni az ambivalenciát.',
    coachState: [
      'Empátia',
      'Visszatükrözés',
      'A változásbeszéd felerősítése'
    ],
    utility: [
      'Amikor a kliens halogat',
      'Amikor „kettős érzés” van jelen',
      'Belső konfliktus vagy blokk esetén'
    ],
    clientExperience: [
      'Megkönnyebbülés',
      'Érzelmi rendeződés',
      'Élmény: „Értem, miért tépem magam két irányba”'
    ],
    typicalQuote: '„Mi szól mellette, és mi szól ellene?”',
    bestUsedWhen: 'Amikor a kliens nem tud vagy nem mer dönteni.',
    sequenceStep: 2,
    sequenceDescription: 'A kettősség kibontása (ha ambivalencia jelen van)'
  },
  [ModelId.SOLUTION]: {
    id: ModelId.SOLUTION,
    title: 'Megoldásfókuszú Kérdezés',
    subtitle: 'A működő minták felerősítése',
    icon: Sun,
    color: 'amber',
    essence: 'Nem a problémára figyel, hanem azokra a pillanatokra, amikor már most is működik valami.',
    coachState: [
      'Optimizmus',
      'A kivételek keresése',
      'Az erőforrások észrevétele'
    ],
    utility: [
      'Elakadások esetén',
      'Amikor a kliens túl sok problémával azonosul',
      'Gyors megkönnyebbülés igénye esetén'
    ],
    clientExperience: [
      'Kompetencia érzése',
      'Energia',
      'Azt, hogy „van remény”'
    ],
    typicalQuote: '„Mi működik már most is egy kicsit?”',
    bestUsedWhen: 'Amikor a kliens negatív spirálban, túlproblémás helyzetben vagy leterheltségben van.',
    sequenceStep: 3,
    sequenceDescription: 'Energiát adni, erőforrást találni'
  },
  [ModelId.GROW]: {
    id: ModelId.GROW,
    title: 'GROW Modell',
    subtitle: 'A haladás és a struktúra nyelve',
    icon: TrendingUp,
    color: 'emerald',
    essence: 'A legismertebb keret. A gondolkodást rendszerbe szervezi és lépésekre bontja (Goal, Reality, Options, Will).',
    coachState: [
      'Rendszerezettség',
      'Célorientáltság',
      'Strukturálás'
    ],
    utility: [
      'Amikor már tiszta a helyzet és előre kell lépni',
      'Kusza realitás esetén',
      'Amikor „menedzsmentfókusz” kell'
    ],
    clientExperience: [
      'Tisztaság',
      'Kontroll',
      'A nagy probléma apró lépésekre bomlik'
    ],
    typicalQuote: '„Rendben, és hogyan lépünk tovább?”',
    bestUsedWhen: 'Amikor a kliens haladni akar, de nem látja a következő lépést.',
    sequenceStep: 4,
    sequenceDescription: 'Irányba tenni, lépésekre bontani'
  }
};