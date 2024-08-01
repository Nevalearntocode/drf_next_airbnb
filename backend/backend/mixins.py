import boto3
from botocore.config import Config
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response


class R2DestroyMixin:
    def delete_from_r2(self, file_key):
        s3_client = boto3.client(
            "s3",
            endpoint_url=settings.CLOUDFLARE_R2_ENDPOINT,
            aws_access_key_id=settings.CLOUDFLARE_R2_ACCESS_KEY_ID,
            aws_secret_access_key=settings.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
            config=Config(signature_version="s3v4"),
        )

        try:
            response = s3_client.delete_object(
                Bucket=settings.CLOUDFLARE_R2_BUCKET_NAME, Key=file_key
            )
            return response["ResponseMetadata"]["HTTPStatusCode"] == 204
        except Exception as e:
            print(f"Error deleting file from R2: {e}")
            return False

    def delete_from_r2_helper(self, current_image, request_image=None):
        # if the image is uploaded by a user from local computer their id will be included in the file key
        file_key = current_image.split("/")[-1]
        userId = str(self.request.user.id)

        # if request image is not None means we are updating the image
        if request_image is not None:
            # if request image and current image are different and user is the owner of the current image
            should_delete = current_image != request_image and userId in file_key
            if should_delete:
                return self.delete_from_r2(file_key)
        else:
            if userId in file_key:
                return self.delete_from_r2(file_key)

        return Response(status=status.HTTP_204_NO_CONTENT)
