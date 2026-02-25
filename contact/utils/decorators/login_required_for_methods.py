from functools import wraps
from django.contrib.auth.views import redirect_to_login


def login_required_for_methods(methods: list, login_url='/admin/'):
    methods = {method.upper() for method in methods}

    def decorator(view_func, *args, **kwargs):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if request.method in methods and not request.user.is_authenticated:
                return redirect_to_login(request.get_full_path(), login_url)

            return view_func(request, *args, **kwargs)

        return _wrapped_view

    return decorator
