using AutoFixture;
using AutoFixture.AutoNSubstitute;
using AutoFixture.Xunit2;

namespace NAP.SLI.Tests
{
    public class AutoDomainDataAttribute : AutoDataAttribute
    {
        public AutoDomainDataAttribute()
        : base(() => new Fixture().Customize(new AutoNSubstituteCustomization()))
        {
        }
    }
}