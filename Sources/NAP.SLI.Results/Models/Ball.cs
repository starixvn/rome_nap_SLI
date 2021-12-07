namespace NAP.SLI.Results.Models
{
    public class Ball
    {
        public Ball(string number, string color)
        {
            Number = number;
            Color = color;
        }

        public string Number { get; set; }

        public string Color { get; set; }
    }
}