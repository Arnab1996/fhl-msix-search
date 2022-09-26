<#
.DESCRIPTION
    This script reads the file path and file name as the parameter.
    It does the task of upoading the file to the blob and syncing it at duration of 40 seconds.
#>
param(

    [Parameter(Mandatory = $true)][String]
    $path,
    [Parameter(Mandatory = $true)][String]
    $file
)

$src = $path + $file
$global:sasUrl = New-AzStorageBlobSASToken -Context $ctx -Container data -Blob $file -Permission racwd -ExpiryTime $exp -FullUri
$dest = $global:sasUrl

while ($true)
{
    $r = Get-AzStorageBlob -Context $ctx -Container 'data' | Where-Object { $_.Name -like $file }
    # Check if the file is already present on the blob.
    if ($r.Name -eq $file)
    {
        # If file is already there then it removes it.
        cd "C:\Users\snigdhalnu"
        Remove-AzStorageBlob -Container 'data' -Context $ctx -Blob $file -Verbose
    }

    # Upload the file on blob using azcopy
    azcopy copy $src $dest --recursive = true
    Start-Sleep -Seconds 40
}

