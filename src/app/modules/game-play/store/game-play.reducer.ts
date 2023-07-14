import { createReducer, on } from '@ngrx/store';
import { GamePlayState, PlayPhases, TeamColors } from './game-play.state';
import { gamePlayActions } from './game-play.actions';
import { SlideType } from '../../editor/state/editor.state';

const initialState: GamePlayState = {
  allGame: null,
  currentSlideIndex: null,
  currentSlide: null,
  playPhase: null,
  fightList: [],
  questionAnswerState: null,
  gameConfig: null,
  score: {
    [TeamColors.PURPLE]: 0,
    [TeamColors.YELLOW]: 0,
    [TeamColors.CYAN]: 0,
    [TeamColors.AMBER]: 0,
  },
};

export const gamePlayReducer = createReducer(
  initialState,
  on(gamePlayActions.initGameFromEditor, (state, { game }) => ({
    ...state,
    allGame: game,
    currentSlideIndex: 0,
    currentSlide: game.slides[0],
    playPhase: PlayPhases.SIMPLE,
  })),

  on(gamePlayActions.setGameConfig, (state, { availableTeams }) => ({
    ...state,
    gameConfig: {
      availableTeams,
      fightDurationMS: 3000,
      listeningDurationMS: 5000,
      accuracyMS: 500,
      accuracyIterations: 2,
      buttonThrottleMS: 1000,
      countdownDurationMS: 3000,
      freezeTimeMS: 10000,
    },
  })),

  on(gamePlayActions.changeSlide, (state, { slideIndex }) => {
    const slide = state.allGame.slides[slideIndex];
    const newPlayPhase =
      slide?.type === SlideType.questionWithImage
        ? PlayPhases.QUESTION_TITLE
        : PlayPhases.SIMPLE;
    return {
      ...state,
      currentSlideIndex: slideIndex,
      currentSlide: slide,
      playPhase: newPlayPhase,
      questionAnswerState: null,
    };
  }),

  on(gamePlayActions.startCountdown, (state) => ({
    ...state,
    playPhase: PlayPhases.QUESTION_COUNTDOWN,
  })),

  on(gamePlayActions.askQuestion, (state) => ({
    ...state,
    playPhase: PlayPhases.QUESTION_ASK,
  })),

  on(gamePlayActions.startFight, (state, { player, date }) => ({
    ...state,
    playPhase: PlayPhases.QUESTION_FIGHT,
    currentFight: {
      questionNumber: state.currentSlideIndex,
      pushes: [{ date, player }],
    },
  })),

  on(gamePlayActions.addPlayerToFight, (state, { player, date }) => ({
    ...state,
    currentFight: {
      ...state.currentFight,
      pushes: [...state.currentFight.pushes, { date, player }],
    },
  })),

  on(gamePlayActions.startListening, (state) => ({
    ...state,
    playPhase: PlayPhases.QUESTION_LISTENING,
    questionAnswerState: {
      date: new Date(),
      answeringTeam: state.currentFight.pushes.reduce((prev, curr) =>
        prev?.date && prev.date < curr.date ? prev : curr,
      ).player.team,
    },
    fightList: [...state.fightList, state.currentFight],
    currentFight: null,
  })),

  on(gamePlayActions.answerVerdict, (state, { result, delta }) => {
    const newScore = { ...state.score };
    newScore[state.questionAnswerState.answeringTeam] += delta;
    return {
      ...state,
      playPhase: PlayPhases.QUESTION_VERDICT,
      questionAnswerState: {
        date: new Date(),
        answeringTeam: state.questionAnswerState.answeringTeam,
        answerResult: { type: result, delta },
      },
      score: newScore,
    };
  }),
  on(gamePlayActions.showAnswer, (state) => ({
    ...state,
    playPhase: PlayPhases.QUESTION_ANSWER_SHOW,
  })),
  on(gamePlayActions.editScore, (state, { team, score }) => ({
    ...state,
    score: { ...state.score, [team]: score },
  })),
);
