using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.NAP.Client.Models;
using Fanex.NAP.Client.Services;
using NAP.SLI.Tests;
using NAP.SLI.UserManagement.Handlers;
using NAP.SLI.UserManagement.Models;
using NAP.SLI.UserManagement.Requests;
using Newtonsoft.Json;
using NSubstitute;
using Xunit;

namespace NAP.SLI.UserManagement.Tests.Handlers
{
    public class QueryHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenSuccess(
            IUserService userService,
            QueryRequest request)
        {
            //Arrange
            var handler = new QueryHandler(userService);
            request.Username = "test";
            IEnumerable<User> users = new List<User>
            {
                new User
                {
                    Id = 1,
                    Username = "test",
                    FirstName = "testF",
                    LastName = "testL",
                    Email = "test@email",
                    Group = new Group
                    {
                        Name = "SLI"
                    },
                    Creator = new User
                    {
                        Username = "testC"
                    },
                    CreatedDate = DateTime.Parse("2022/02/02")
                },
                new User
                {
                    Id = 2,
                    Username = "test1",
                    Group = new Group
                    {
                        Name = "SLI1"
                    }
                },
                new User
                {
                    Id = 3,
                    Username = "test2",
                    FirstName = "test2F",
                    LastName = "test2L",
                    Email = "test2@email",
                    Group = new Group
                    {
                        Name = "SLI"
                    },
                    Creator = new User
                    {
                        Username = "test2C"
                    },
                    CreatedDate = DateTime.Parse("2022/03/03")
                },
                new User
                {
                    Id = 4,
                    Username = "t1est2",
                    Group = new Group
                    {
                        Name = "SLI"
                    }
                }
            };
            userService.GetAllAsync().Returns(Task.FromResult(users));

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = new List<UserModel>
            {
                new UserModel
                {
                    UserId = 1,
                    UserName = "test",
                    FirstName = "testF",
                    LastName = "testL",
                    Email = "test@email",
                    Creator = "testC",
                    CreatedDate = DateTime.Parse("2022/02/02")
                },
                new UserModel
                {
                    UserId = 3,
                    UserName = "test2",
                    FirstName = "test2F",
                    LastName = "test2L",
                    Email = "test2@email",
                    Creator = "test2C",
                    CreatedDate = DateTime.Parse("2022/03/03")
                },
            };
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }
    }
}