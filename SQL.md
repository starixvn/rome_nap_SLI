// get customer for report Win Loss Detail
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