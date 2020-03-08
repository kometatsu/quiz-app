import Quiz from "../../../src/models/Quiz";

const createMockQuiz = () => {
  return {
    question: "クイズの問題",
    correctAnswer: "答え",
    incorrectAnswers: ["不正解1", "不正解2", "不正解3"]
  };
};

describe("Quizのテスト", () => {
  it("importチェック", () => {
    expect(typeof Quiz).toStrictEqual("function");
  });

  describe("インスタンスメソッド", () => {
    describe("constructor", () => {
      it("コンストラクタで渡した値をプロパティに保持する", () => {
        const quizDate = createMockQuiz();
        const quiz = new Quiz(quizDate);

        expect(quiz._question).toStrictEqual(quizDate.question);
        expect(quiz._correctAnswer).toStrictEqual(quizDate.correctAnswer);
        expect(quiz._incorrectAnswers).toStrictEqual(quizDate.incorrectAnswers);
      });
    });

    describe("getter", () => {
      it("questionとcorrectAnswerのgetterが使える", () => {
        const quizDate = createMockQuiz();
        const quiz = new Quiz(quizDate);

        expect(quiz.question).toStrictEqual(quizDate.question);
        expect(quiz.correctAnswer).toStrictEqual(quizDate.correctAnswer);
        expect(quiz.incorrectAnswers).toStrictEqual(undefined);
      });
    });

    describe("shuffleメソッド", () => {
      it("シャッフルされる", () => {
        const quizDate = createMockQuiz();
        const quiz = new Quiz(quizDate);

        const shuffledAnswers1 = quiz.shuffleAnswers();
        const shuffledAnswers2 = quiz.shuffleAnswers();
        expect(shuffledAnswers1).not.toStrictEqual(shuffledAnswers2);
      });
    });

    describe("judgeCorrectAnswerメソッド", () => {
      const quizDate = createMockQuiz();
      const quiz = new Quiz(quizDate);

      expect(quiz.judgeCorrectAnswer(quizDate.correctAnswer)).toStrictEqual(
        true
      );
      quizDate.incorrectAnswers.forEach((incorrectAnswers) => {
        expect(quiz.judgeCorrectAnswer(incorrectAnswers)).toStrictEqual(false);
      });
    });

    describe("クラスメソッド", () => {
      describe("fetchAndCreateQuizzesメソッド", () => {
        it("10件のQuizインスタンスが返る", async () => {
          const quizzes = await Quiz.fetchAndCreateQuizzes();

          expect(Array.isArray(quizzes)).toStrictEqual(true);
          expect(quizzes.length).toStrictEqual(10);
          quizzes.forEach((quiz) => {
            expect(quiz instanceof Quiz).toStrictEqual(true);
          });
        });
      });
    });
  });
});
