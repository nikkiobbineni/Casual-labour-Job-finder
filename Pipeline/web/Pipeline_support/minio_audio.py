from minio import Minio
# from minio.error import ResponseError

# Initialize Minio client
minio_client = Minio(
    "play.min.io",
    access_key="Q3AM3UQ867SPQQA43P2F",
    secret_key="zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
    secure=True,
)

def func_upload(file_path, bucket_name, object_name):
    # Upload file to Minio
    
    minio_client.fput_object(bucket_name, object_name, file_path)
    # except ResponseError as err:
        # print(err)

def func_get_url(bucket_name, object_name):
    # Get URL for uploaded file
    
    url = minio_client.presigned_get_object(bucket_name, object_name)
    return url
    # except ResponseError as err:
        # print(err)

func_upload("./sample/Location.wav", "audio", "location_hindi.wav")

url = func_get_url("audio", "location_hindi.wav")
# print(func_get_url("audio", "./sample/Location.wav"))


