namespace NAP.SLI.Results.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using NAP.SLI.Common.Models;

    public class Happy5Match : Match
    {
        private const string RedBallColor = "red";
        private const string BlueBallColor = "blue";
        private const string Big = "B";
        private const string Small = "S";
        private const string Even = "E";
        private const string Odd = "O";
        private const string MoreOdd = "MO";
        private const string MoreEven = "ME";
        private const string Spring = "Sp";
        private const string Summer = "Su";
        private const string Autumn = "Au";
        private const string Winter = "Wi";
        private const string NA = "N/A";

        public Happy5Match(Result result) : base(result)
        {
        }

        public string NoMatch => $"No. {result.MatchCode}";

        public Ball FirstBall
        {
            get
            {
                var ballNumber = GetBall(0);
                var ballColor = GetBallColor(ballNumber);

                return new Ball(ballNumber, ballColor);
            }
        }

        public Ball SecondBall
        {
            get
            {
                var ballNumber = GetBall(1);
                var ballColor = GetBallColor(ballNumber);

                return new Ball(ballNumber, ballColor);
            }
        }

        public Ball ThirdBall
        {
            get
            {
                var ballNumber = GetBall(2);
                var ballColor = GetBallColor(ballNumber);

                return new Ball(ballNumber, ballColor);
            }
        }

        public Ball FourthBall
        {
            get
            {
                var ballNumber = GetBall(3);
                var ballColor = GetBallColor(ballNumber);

                return new Ball(ballNumber, ballColor);
            }
        }

        public Ball FifthBall
        {
            get
            {
                var ballNumber = GetBall(4);
                var ballColor = GetBallColor(ballNumber);

                return new Ball(ballNumber, ballColor);
            }
        }

        public string TotalBall => EventStatusIsRefund ? NA : Total.ToString();

        public string BigSmall => EventStatusIsRefund ? NA : GetBigSmallResult();

        public string OddEven => EventStatusIsRefund ? NA : GetEvenOddResult();

        public string FourSeason => EventStatusIsRefund ? NA : GetFourSeasonResult(Total);

        public string MoreOddMoreEven => EventStatusIsRefund ? NA : GetMoreOddMoreEvenResult();

        public string Soccer5 => EventStatusIsRefund ? NA : string.Empty;

        public string Soccer5Class => EventStatusIsRefund ? string.Empty : "info";

        public string Combo => EventStatusIsRefund ? NA : BigSmall + OddEven;

        public string Balls => string.Join(", ", Ball);

        public bool EventStatusIsRefund
                    => EventStatus.Equals(Constants.Refund, StringComparison.OrdinalIgnoreCase) ||
                        EventStatus.Equals(Constants.RefundFT, StringComparison.OrdinalIgnoreCase) ||
                        EventStatus.Equals(Constants.RefundHT, StringComparison.OrdinalIgnoreCase);

        private static string GetBallColor(string ballNumber)
        {
            var redBall = new List<string> { "1", "3", "4", "6", "8", "10", "12", "15", "17", "20" };

            return redBall.Contains(ballNumber) ? RedBallColor : BlueBallColor;
        }

        private string GetBall(int index)
           => (Ball.Count > 0 && index < Ball.Count) ?
                Ball[index].ToString() : "0";

        private string GetBigSmallResult() => Total >= 53 ? Big : Small;

        private string GetEvenOddResult() => Total % 2 == 0 ? Even : Odd;

        private string GetMoreOddMoreEvenResult() => CountOdd(Ball) > 2 ? MoreOdd : MoreEven;

        private static string GetFourSeasonResult(uint totalBall)
        {
            if (totalBall >= 15 && totalBall <= 33)
            {
                return Spring;
            }

            if (totalBall >= 34 && totalBall <= 52)
            {
                return Summer;
            }

            if (totalBall >= 53 && totalBall <= 71)
            {
                return Autumn;
            }

            if (totalBall >= 72 && totalBall <= 90)
            {
                return Winter;
            }

            return NA;
        }

        private static int CountOdd(IList<int> ball)
        {
            int result = 0;

            for (int i = 0; i < ball.Count; i++)
            {
                if (ball[i] % 2 != 0)
                {
                    result++;
                }
            }

            return result;
        }

        private uint Total => (uint)Ball.Sum();
    }
}