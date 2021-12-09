namespace NAP.SLI.Results.Models
{
    using System.Collections.Generic;
    using System.Linq;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Results.Utilities;

    public class NumberGameMatch : Match
    {
        private const string Odd = "Odd";
        private const string Even = "Even";
        private const string RedBallColor = "red";
        private const string BlueBallColor = "blue";

        public NumberGameMatch(Result result) : base(result)
        {
        }

        public string NoMatch => $"Number Game No {result.MatchCode}";

        public Ball FirstBall
        {
            get
            {
                var ballNumber = Ball.Count > 0 ? Helper.FormatTwoDigit(Ball[0]) : Constants.DoubleZero;
                var ballColor = GetBallColor(ballNumber);

                return new Ball(ballNumber, ballColor);
            }
        }

        public Ball SecondBall
        {
            get
            {
                const int secondBallIndex = 2;
                var ballNumber = Ball.Count >= secondBallIndex ? Helper.FormatTwoDigit(Ball[secondBallIndex - 1]) : Constants.DoubleZero;
                var ballColor = GetBallColor(ballNumber);

                return new Ball(ballNumber, ballColor);
            }
        }

        public Ball ThirdBall
        {
            get
            {
                const int thirdBallIndex = 3;
                var ballNumber = Ball.Count >= thirdBallIndex ? Helper.FormatTwoDigit(Ball[thirdBallIndex - 1]) : Constants.DoubleZero;
                var ballColor = GetBallColor(ballNumber);

                return new Ball(ballNumber, ballColor);
            }
        }

        public string OEFT => (uint)Ball.Sum() % 2 == 1 ? Odd : Even;

        private static string GetBallColor(string ballNumber)
        {
            if (ballNumber.Equals(Constants.DoubleZero))
            {
                return "disable";
            }

            var redBall = new List<string> {"01", "03", "04", "06", "08", "10", "12", "15", "17", "20",
                "21", "23", "26", "29", "31", "33", "34", "35", "38", "40", "42", "44", "45", "47", "49",
                "51", "53", "56", "58", "59", "62", "65", "67", "70", "71", "73", "74" };

            return redBall.Contains(ballNumber) ? RedBallColor : BlueBallColor;
        }

    }
}