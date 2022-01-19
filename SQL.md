// Win Loss Detail
declare @FDate DATETIME ='2021-10-01 00:00:00'
declare @TDate datetime ='2022-01-19 00:00:00'
declare @ProductIds VARCHAR(MAX) = '3'
DECLARE @isTest BIT = 0

SELECT top 100 c.custid, c.username
from (select
				CustId			= b.mrecommend
			FROM dbo.bettrans b WITH (NOLOCK)

			WHERE b.winlostdate BETWEEN @FDate AND @TDate
				AND b.statusId IN (111, 112, 113)
				AND EXISTS (SELECT 1 FROM dbo.f_SportBettypeMatrixByProduct_Sel(@ProductIds, @IsTest) bt WHERE b.bettype = bt.bettype)
			GROUP BY
				b.mrecommend) as b
				inner join dbo.Customer as c WITH (NOLOCK) ON b.CustId=c.custid



// Win Loss By Bet Type
declare @FromDate SMALLDATETIME ='2021-12-01'
declare @ToDate SMALLDATETIME ='2022-01-19'
declare @BalanceUpDay	SMALLDATETIME = '2021-12-01'
declare @MoveBetsDay	SMALLDATETIME = '2022-01-15'
declare @ProductIds VARCHAR(MAX) = '3'
DECLARE @isTest BIT = 0
declare @CustId INT = 916498

DECLARE @FDate SMALLDATETIME, @TDate SMALLDATETIME

declare @Temp table (
CustId INT
)

IF @ToDate > @MoveBetsDay
		BEGIN
			SELECT	@FDate	= CASE WHEN @FromDate <= @MoveBetsDay THEN DATEADD(DAY, 1, @MoveBetsDay) ELSE @FromDate END
					,@TDate = @ToDate

insert into @Temp
SELECT top 100
				b.srecommend
			FROM dbo.bettrans b WITH (NOLOCK)
			WHERE b.winlostdate BETWEEN @FDate AND @TDate
				AND b.statusId IN (111, 112, 113)
				AND EXISTS (SELECT 1 FROM dbo.f_SportBettypeMatrixByProduct_Sel(@ProductIds, @IsTest) bt WHERE b.bettype = bt.bettype)
			GROUP BY
				b.srecommend
				END

IF @FromDate <= @MoveBetsDay
		BEGIN
		SELECT	@FDate	= CASE WHEN @FromDate < @BalanceUpDay THEN @BalanceUpDay ELSE @FromDate END
					,@TDate = CASE WHEN @ToDate > @MoveBetsDay THEN @MoveBetsDay ELSE @ToDate END

insert into @Temp
SELECT top 100
				b.srecommend
			FROM dbo.bettrans14 b WITH (NOLOCK)
			WHERE b.winlostdate BETWEEN @FDate AND @TDate
				AND b.statusId IN (111, 112, 113)
				AND EXISTS (SELECT 1 FROM dbo.f_SportBettypeMatrixByProduct_Sel(@ProductIds, @IsTest) bt WHERE b.bettype = bt.bettype)
			GROUP BY
				b.srecommend

				END

select c.custid, c.username from @Temp as t
inner join dbo.Customer as c WITH (nolock)
on t.CustId = c.custid