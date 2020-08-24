from django.db import models
from django.conf import settings
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
import re


def user_path(instance, filename):
    from random import choice
    import string
    arr = [choice(string.ascii_letters) for _ in range(8)]
    pid = ''.join(arr)
    extension = filename.split('.')[-1]
    return 'accounts/{}/{}.{}'.format(instance.user.username, pid, extension)

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nickname = models.CharField('별명', max_length=30, unique=True)
    picture = ProcessedImageField(upload_to=user_path,
                                   processors=[ResizeToFill(150,150)],
                                   format='JPEG',
                                   options={'quality': 90},
                                   blank=True,
                                   )
    
    about = models.CharField(max_length=300, blank=True)
    
    GENDER_C = (
        ('선택안함', '선택안함'),
        ('여성', '여성'),
        ('남성', '남성'),
    )
    
    gender = models.CharField('성별(선택사항)',
                                max_length=10,
                                choices=GENDER_C,
                                default='N')
    
    
    
class Friend(models.Model):
    # 상대방
    user = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, on_delete=models.CASCADE)
    
    # room = models.ForeignKey(Room, blank=True, on_delete=models.SET_NULL, null=True)
    
    # 현재 로그인한 나
    current_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = 'friends', blank=True, on_delete=models.CASCADE)
    
    created_at = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.user.username
    
class FriendRequest(models.Model):
    # 요청을 보내는 쪽
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='friends_requests', on_delete=models.CASCADE)
    
    # 요청을 받는 쪽
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='requested_friend_requests', on_delete=models.CASCADE)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return "{} -> {}".format(self.from_user, self.to_user)
    
    class Meta:
        unique_together = (
            ('from_user', 'to_user')            
        )
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    