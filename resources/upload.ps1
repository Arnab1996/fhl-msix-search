<#
.DESCRIPTION
    This script reads the folder path where the files to be uploaded on the blob are kept. 
    It parallely uploads the files into the blob 
#>
param(

    [Parameter(Mandatory = $true)][String]
    $filepath

)

# Logs in to Azure Active Directory to access Azure Storage resources.
azcopy login

cd "C:\Users\snigdhalnu"
# Connects to the Azure account
Connect-AzAccount

# Generating SAS URL for connecting to blob container
$rg = "MSIX"
$storageaccount = "fhlmsix"
$key = (Get-AzStorageAccountKey -ResourceGroupName $rg -Name $storageaccount)[0].Value
$context = New-AzStorageContext -StorageAccountName $storageaccount -StorageAccountKey $key
$StartTime = Get-Date
$EndTime = $StartTime.AddDays(6)

# Checking all the file names at the location
cd $filepath
$dir = ls
$list = $dir.Name

# Parallel upload of files
$list | ForEach-Object -Parallel {
    $exp = $using:EndTime
    $ctx = $using:context
    $filep = $using:filepath + "\"
    cd "C:\Users\snigdhalnu\source\repos\azcopy"
    .\azcopy.ps1 -path $filep -file $_
}