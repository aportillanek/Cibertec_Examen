create PROCEDURE [dbo].[CorporationPagedList]
	@startRow int,
	@endRow int
AS
BEGIN
	SELECT  [corp_no]
		   ,[corp_name]
		   ,[street]
		   ,[city]
		   ,[state_prov]
		   ,[country]
		   ,[mail_code]
		   ,[phone_no]
		   ,[expr_dt]
		   ,[corp_code]
	FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY corp_no ) AS RowNum,
						[corp_no]
		   ,[corp_name]
		   ,[street]
		   ,[city]
		   ,[state_prov]
		   ,[country]
		   ,[mail_code]
		   ,[phone_no]
		   ,[expr_dt]
		   ,[corp_code]
			  FROM     [dbo].[corporation]          
			) AS RowConstrainedResult
	WHERE   RowNum >= @startRow
		AND RowNum <= @endRow
	ORDER BY RowNum
END
