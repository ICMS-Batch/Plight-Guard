if [  -d "./4ds-auth" ]
then
  rm -r 4ds-auth
fi

if [  -d "./gophysio" ] 
then 
  rm -rf gophysio
fi
META_BAK="$(aws s3api list-objects --bucket 4dhs-db-backup-prod --prefix '4dh-meta' --output text --query 'reverse(sort_by(Contents, &LastModified))[:1].Key')"
AUTH_BAK="$(aws s3api list-objects --bucket 4dhs-db-backup-prod --prefix '4dh-auth' --output text --query 'reverse(sort_by(Contents, &LastModified))[:1].Key')"
# META_BAK="$(aws s3api list-objects --bucket 4dhs-dev-backup --prefix '4dh-meta' --output text --query 'reverse(sort_by(Contents, &LastModified))[:1].Key')"
# AUTH_BAK="$(aws s3api list-objects --bucket 4dhs-dev-backup --prefix '4dh-auth' --output text --query 'reverse(sort_by(Contents, &LastModified))[:1].Key')"

aws s3 cp "s3://4dhs-db-backup-prod/${META_BAK}" .
aws s3 cp "s3://4dhs-db-backup-prod/${AUTH_BAK}" .
# aws s3 cp "s3://4dhs-dev-backup/${META_BAK}" .
# aws s3 cp "s3://4dhs-dev-backup/${AUTH_BAK}" .

META_TAR="$(echo $META_BAK | cut -d '/' -f 2)"
AUTH_TAR="$(echo $AUTH_BAK | cut -d '/' -f 2)"
tar -xf $META_TAR --strip=2
tar -xf $AUTH_TAR --strip=2
if [ -d "./${META_TAR}" ]
then
        echo $META_TAR
        echo 'meta file exist'
fi
if [ -d "./${AUTH_TAR}" ]
then
        echo 'auth file exists'
        echo $AUTH_TAR
fi

if [ ! -d "./4ds-auth" ] 
then 
	echo "Directory 4ds-auth doesn't exist"
	echo "Exiting ..."
	exit 1
fi

if [ ! -d "./gophysio" ] 
then 
	echo "Directory gophysio  doesn't exist"
	echo "Exiting ..."
	exit 1
fi

mongorestore --host=localhost:27018 --drop -d 4ds-auth ./4ds-auth 
mongorestore --host=localhost:27018 --drop -d gophysio ./gophysio

